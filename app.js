const MAX_QUESTIONS = 6;   // 질문(스킵 포함) 최대 개수
const STOP_AT = 3;         // 후보가 이 이하로 줄면 질문 종료
const MAX_REROLLS = 3;     // '다른 거 뽑기'를 이만큼 누르면 "알아서 먹어!" 엔딩

const $app = document.getElementById('app');
const $progress = document.getElementById('progress');

let S;

function reset() {
  S = { step: 'meal', meal: null, cuisines: new Set(), pool: [], asked: [], answers: [], current: null, queue: [], idx: 0 };
  render();
}

// ── 알고리즘 ─────────────────────────────────────────────
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

function buildPool() {
  return MENUS.filter(x =>
    (x.meal === 'B' || x.meal === S.meal) &&
    (S.cuisines.size === 0 || S.cuisines.has(x.cuisine)));
}

// 남은 후보를 가장 반반으로 나눠주는 질문을 고른다 (동점이면 랜덤)
function pickQuestion() {
  if (S.pool.length <= STOP_AT || S.asked.length >= MAX_QUESTIONS) return null;
  const n = S.pool.length;
  const scored = QUESTIONS
    .filter(q => !S.asked.includes(q.id) && (!q.dinnerOnly || S.meal === 'D'))
    .map(q => {
      const yes = S.pool.filter(q.a.test).length;
      return { q, yes, balance: Math.min(yes, n - yes) / n };
    })
    .filter(s => s.yes > 0 && s.yes < n);            // 양쪽 다 후보가 남는 질문만
  if (!scored.length) return null;
  const best = Math.max(...scored.map(s => s.balance));
  return shuffle(scored.filter(s => s.balance >= best - 0.05))[0].q;
}

function answer(choice) {
  const q = S.current;
  S.asked.push(q.id);
  if (choice !== 'skip') {
    const opt = q[choice];
    S.pool = S.pool.filter(x => (choice === 'a' ? opt.test(x) : !q.a.test(x)));
    S.answers.push({ emoji: opt.emoji, tag: opt.tag });
  }
  nextQuestionOrResult();
}

function nextQuestionOrResult() {
  S.current = pickQuestion();
  if (S.current) { S.step = 'quiz'; render(); }
  else showResult();
}

// ── 화면 ─────────────────────────────────────────────────
function setProgress() {
  const total = 3;
  const cur = { meal: 0, cuisine: 1, quiz: 2, result: 3 }[S.step];
  $progress.innerHTML = Array.from({ length: total }, (_, i) =>
    `<span class="dot ${i < cur ? 'done' : i === cur ? 'now' : ''}"></span>`).join('');
}

function render() {
  setProgress();
  if (S.step === 'meal') renderMeal();
  else if (S.step === 'cuisine') renderCuisine();
  else if (S.step === 'quiz') renderQuiz();
}

function card(html) {
  $app.innerHTML = `<section class="card slide">${html}</section>`;
}

function renderMeal() {
  const h = new Date().getHours();
  const hint = h < 15 ? '지금 시간이면 점심이려나?' : '지금 시간이면 저녁이려나?';
  card(`
    <p class="step">STEP 1</p>
    <h2>지금 뭐 먹을 시간이야?</h2>
    <p class="hint">${hint} 😏</p>
    <div class="grid two">
      <button class="opt big" data-meal="L"><span class="e">☀️</span><b>점심</b><small>빠르고 든든하게</small></button>
      <button class="opt big" data-meal="D"><span class="e">🌙</span><b>저녁</b><small>하루 수고한 나에게</small></button>
    </div>`);
  $app.querySelectorAll('[data-meal]').forEach(b => b.onclick = () => {
    S.meal = b.dataset.meal; S.step = 'cuisine'; render();
  });
}

function renderCuisine() {
  card(`
    <p class="step">STEP 2</p>
    <h2>어떤 종류가 끌려?</h2>
    <p class="hint">여러 개 골라도 되고, 안 고르면 <b>전부 다 OK</b>!</p>
    <div class="grid three">
      ${CUISINES.map(c => `
        <button class="opt ${S.cuisines.has(c.id) ? 'on' : ''}" data-c="${c.id}">
          <span class="e">${c.emoji}</span><b>${c.id}</b><small>${c.sub}</small>
        </button>`).join('')}
    </div>
    <div class="actions">
      <button class="ghost" id="back">← 뒤로</button>
      <button class="primary" id="next">${S.cuisines.size ? '다음' : '다 좋아! 다음'}</button>
    </div>`);
  $app.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
    const id = b.dataset.c;
    S.cuisines.has(id) ? S.cuisines.delete(id) : S.cuisines.add(id);
    b.classList.toggle('on');
    document.getElementById('next').textContent = S.cuisines.size ? '다음' : '다 좋아! 다음';
  });
  document.getElementById('back').onclick = () => { S.step = 'meal'; render(); };
  document.getElementById('next').onclick = () => {
    S.pool = buildPool(); S.asked = []; S.answers = [];
    nextQuestionOrResult();
  };
}

function renderQuiz() {
  const q = S.current;
  const n = S.pool.length;
  card(`
    <p class="step">STEP 3 · 후보 <b>${n}</b>개 남음</p>
    <h2>${q.q}</h2>
    <div class="grid two vs">
      <button class="opt big" data-a="a"><span class="e">${q.a.emoji}</span><b>${q.a.label}</b></button>
      <button class="opt big" data-a="b"><span class="e">${q.b.emoji}</span><b>${q.b.label}</b></button>
    </div>
    <div class="actions center">
      <button class="ghost" data-a="skip">상관없어 🤷</button>
    </div>
    ${S.answers.length ? `<div class="chips">${S.answers.map(a => `<span class="chip">${a.emoji} ${a.tag}</span>`).join('')}</div>` : ''}`);
  $app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => answer(b.dataset.a));
}

// ── 결과 ─────────────────────────────────────────────────
const SPIN_EMOJI = MENUS.map(x => x.emoji);

function showResult() {
  S.step = 'result';
  S.queue = shuffle(S.pool);
  S.idx = 0;
  S.rerolls = 0;
  setProgress();
  spinThenReveal(1400);
}

function spinThenReveal(ms) {
  card(`<div class="spin"><div class="spin-e" id="spinE">🍽️</div><p>오늘의 메뉴를 고르는 중...</p></div>`);
  const el = document.getElementById('spinE');
  const t = setInterval(() => { el.textContent = SPIN_EMOJI[Math.floor(Math.random() * SPIN_EMOJI.length)]; }, 80);
  setTimeout(() => { clearInterval(t); renderResult(); }, ms);
}

function renderResult() {
  const pick = S.queue[S.idx];
  const others = S.queue.map((x, i) => ({ x, i })).filter(o => o.i !== S.idx);
  const mealLabel = S.meal === 'L' ? '점심' : '저녁';
  card(`
    <p class="step">오늘의 ${mealLabel} 추천 🎉</p>
    <div class="result-e pop">${pick.emoji}</div>
    <h1>${pick.name}</h1>
    <p class="line">"${pick.line}"</p>
    <div class="tags">
      <span class="tag">${pick.cuisine}</span>
      <span class="tag">${'₩'.repeat(pick.price)}</span>
      ${pick.soup ? '<span class="tag">국물</span>' : ''}
      ${pick.spicy ? `<span class="tag">${'🌶️'.repeat(pick.spicy)}</span>` : ''}
    </div>
    ${S.answers.length ? `<div class="chips"><span class="chips-title">너의 취향 →</span>${S.answers.map(a => `<span class="chip">${a.emoji} ${a.tag}</span>`).join('')}</div>` : ''}
    <div class="actions col">
      <a class="primary link" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(pick.name)}">📍 근처 ${pick.name} 맛집 찾기</a>
      <div class="row">
        <button class="ghost" id="again">${S.rerolls === MAX_REROLLS - 1 ? '🎲 마지막 기회!' : '🎲 다른 거 뽑기'}</button>
        <button class="ghost" id="restart">↺ 처음부터</button>
      </div>
      <button class="text-btn" id="giveup">😤 다 맘에 안 들어!</button>
    </div>
    ${others.length ? `
      <div class="others"><p>이런 후보도 있었어</p>
        ${others.map(o => `<button class="mini" data-i="${o.i}">${o.x.emoji} ${o.x.name}</button>`).join('')}
      </div>` : ''}`);
  document.getElementById('again').onclick = () => {
    S.rerolls++;
    if (S.rerolls >= MAX_REROLLS || S.queue.length < 2) return renderGiveUp();
    S.idx = (S.idx + 1) % S.queue.length;
    spinThenReveal(700);
  };
  document.getElementById('giveup').onclick = renderGiveUp;
  document.getElementById('restart').onclick = reset;
  $app.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { S.idx = +b.dataset.i; renderResult(); });
}

// ── 엔딩: 그냥 알아서 먹어! ──────────────────────────────
const GIVE_UPS = [
  { e: '🫠', sub: '여기까지 온 정성은 인정. 이제 네 배꼽시계를 믿어봐.' },
  { e: '🙄', sub: '고르고 고르다 결국 이러기 있기? 냉장고나 열어봐.' },
  { e: '🤷', sub: '솔직히 배고프면 다 맛있어. 진짜야.' },
  { e: '😤', sub: '내가 이렇게까지 했는데... 편의점이라도 가!' },
  { e: '🍚', sub: '정 모르겠으면 흰쌀밥에 김치. 끝.' },
  { e: '🥲', sub: '결정장애 치료는 여기까지. 나머지는 네 몫이야.' },
];

function renderGiveUp() {
  const g = GIVE_UPS[Math.floor(Math.random() * GIVE_UPS.length)];
  card(`
    <p class="step">THE END</p>
    <div class="result-e pop">${g.e}</div>
    <h1 class="giveup-title">그냥 알아서 먹어!!</h1>
    <p class="line">${g.sub}</p>
    <div class="actions col">
      <button class="primary" id="oneMore">🥺 그래도 하나만 골라줘</button>
      <button class="ghost" id="restart">↺ 처음부터 다시</button>
    </div>`);
  document.getElementById('oneMore').onclick = showResult;
  document.getElementById('restart').onclick = reset;
}

reset();
