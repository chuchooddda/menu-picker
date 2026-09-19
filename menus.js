// 메뉴 데이터 + 질문 정의
// meal: 'L' 점심 전용 / 'D' 저녁 전용 / 'B' 둘 다
// spicy: 0 순한맛 / 1 살짝 / 2 매운맛
// price: 1 가성비 / 2 보통 / 3 플렉스

const m = (name, emoji, cuisine, meal, price, line, f = {}) => ({
  name, emoji, cuisine, meal, price, line,
  soup: !!f.soup, spicy: f.spicy || 0, heavy: !!f.heavy, noodle: !!f.noodle,
  rice: !!f.rice, meat: !!f.meat, greasy: !!f.greasy, share: !!f.share, booze: !!f.booze,
});

const MENUS = [
  // ── 한식 ──
  m('김치찌개', '🍲', '한식', 'B', 1, '실패 확률 0%, 한국인의 소울푸드', { soup: 1, spicy: 2, heavy: 1, rice: 1, meat: 1 }),
  m('된장찌개', '🥘', '한식', 'B', 1, '구수함으로 속을 안아주는 한 그릇', { soup: 1, rice: 1 }),
  m('비빔밥', '🍚', '한식', 'B', 1, '고민될 땐 다 넣고 비비면 됩니다', { spicy: 1, rice: 1 }),
  m('제육볶음', '🔥', '한식', 'B', 1, '밥도둑 등장, 공깃밥 추가 각', { spicy: 2, heavy: 1, rice: 1, meat: 1, greasy: 1 }),
  m('삼겹살', '🥓', '한식', 'D', 3, '굽는 자가 곧 주인공', { heavy: 1, meat: 1, greasy: 1, share: 1, booze: 1 }),
  m('갈비탕', '🍖', '한식', 'B', 2, '든든하게 몸보신 한 사발', { soup: 1, heavy: 1, rice: 1, meat: 1 }),
  m('순대국밥', '🥣', '한식', 'B', 1, '깍두기 국물 한 스푼이 포인트', { soup: 1, spicy: 1, heavy: 1, rice: 1, meat: 1 }),
  m('냉면', '🍜', '한식', 'B', 2, '시원하게 한 방에 정신 번쩍', { soup: 1, spicy: 1, noodle: 1 }),
  m('칼국수', '🍜', '한식', 'B', 1, '후루룩 따끈한 손칼국수', { soup: 1, noodle: 1 }),
  m('닭갈비', '🐔', '한식', 'B', 2, '볶음밥까지 먹어야 완성', { spicy: 2, heavy: 1, rice: 1, meat: 1, share: 1, booze: 1 }),
  m('곱창', '🔥', '한식', 'D', 3, '쫄깃함에 소주가 절로 생각나요', { spicy: 1, heavy: 1, meat: 1, greasy: 1, share: 1, booze: 1 }),
  m('찜닭', '🍗', '한식', 'B', 2, '당면이 진짜 주인공', { spicy: 1, heavy: 1, meat: 1, share: 1 }),
  m('감자탕', '🍲', '한식', 'D', 2, '뼈 뜯는 재미와 얼큰한 국물', { soup: 1, spicy: 2, heavy: 1, meat: 1, share: 1, booze: 1 }),
  m('보쌈', '🥬', '한식', 'D', 2, '쌈 싸 먹는 손맛이 있는 메뉴', { meat: 1, share: 1, booze: 1 }),
  m('불고기', '🥩', '한식', 'B', 2, '달콤짭짤, 누구나 좋아하는 맛', { rice: 1, meat: 1 }),
  m('쌈밥', '🥗', '한식', 'L', 1, '초록초록 건강한 척(진짜 건강함)', { rice: 1 }),
  m('부대찌개', '🍲', '한식', 'B', 1, '햄, 라면사리, 치즈까지 종합선물세트', { soup: 1, spicy: 2, heavy: 1, meat: 1, share: 1 }),

  // ── 일식 ──
  m('초밥', '🍣', '일식', 'B', 3, '한 점 한 점 소중하게', { rice: 1 }),
  m('라멘', '🍜', '일식', 'B', 2, '진한 국물에 차슈 한 장 더', { soup: 1, heavy: 1, noodle: 1, meat: 1, greasy: 1 }),
  m('돈카츠', '🍱', '일식', 'B', 2, '바삭함이 기분까지 바삭하게', { heavy: 1, rice: 1, meat: 1, greasy: 1 }),
  m('우동', '🍜', '일식', 'B', 1, '쫄깃한 면발에 따뜻한 국물', { soup: 1, noodle: 1 }),
  m('규동', '🍛', '일식', 'L', 1, '빠르고 든든한 소고기 덮밥', { rice: 1, meat: 1 }),
  m('회', '🐟', '일식', 'D', 3, '신선함이 곧 정의, 소주 한 잔 곁들여서', { share: 1, booze: 1 }),
  m('소바', '🍜', '일식', 'B', 1, '깔끔하게 차갑게 후루룩', { noodle: 1 }),
  m('텐동', '🍤', '일식', 'B', 2, '바삭한 튀김이 밥 위에 왕처럼', { heavy: 1, rice: 1, greasy: 1 }),
  m('야키토리', '🍢', '일식', 'D', 2, '꼬치 하나에 하이볼 한 잔', { meat: 1, share: 1, booze: 1 }),
  m('샤브샤브', '🫕', '일식', 'B', 2, '담백하게 데쳐 먹는 건강한 만족', { soup: 1, meat: 1, share: 1 }),

  // ── 중식 ──
  m('짜장면', '🍜', '중식', 'B', 1, '오늘의 선택: 짜장 vs 짬뽕 (정답은 짜장)', { heavy: 1, noodle: 1, greasy: 1 }),
  m('짬뽕', '🌶️', '중식', 'B', 1, '얼큰한 국물로 해장 완료', { soup: 1, spicy: 2, noodle: 1 }),
  m('탕수육', '🍤', '중식', 'B', 2, '부먹? 찍먹? 그건 알아서', { heavy: 1, meat: 1, greasy: 1, share: 1 }),
  m('마라탕', '🥵', '중식', 'B', 2, '얼얼하게 중독되는 그 맛', { soup: 1, spicy: 2, heavy: 1, noodle: 1 }),
  m('볶음밥', '🍳', '중식', 'L', 1, '불맛 가득 고슬고슬', { rice: 1, greasy: 1 }),
  m('마라샹궈', '🥘', '중식', 'D', 2, '재료 골라 담는 재미까지 세트', { spicy: 2, heavy: 1, meat: 1, share: 1, booze: 1 }),
  m('양꼬치', '🍢', '중식', 'D', 2, '칭따오 부르는 소리가 들리네요', { spicy: 1, meat: 1, share: 1, booze: 1 }),

  // ── 양식 ──
  m('피자', '🍕', '양식', 'B', 2, '한 조각만... 이라는 거짓말', { heavy: 1, greasy: 1, share: 1 }),
  m('파스타', '🍝', '양식', 'B', 2, '크림이냐 토마토냐, 그것이 문제', { noodle: 1 }),
  m('스테이크', '🥩', '양식', 'D', 3, '오늘은 나를 위해 굽습니다', { heavy: 1, meat: 1 }),
  m('햄버거', '🍔', '양식', 'B', 1, '한 손으로 즐기는 완벽한 한 끼', { heavy: 1, meat: 1, greasy: 1 }),
  m('샐러드', '🥗', '양식', 'L', 2, '오늘만큼은 가볍고 산뜻하게', {}),
  m('리조또', '🍚', '양식', 'B', 2, '크리미한 쌀요리로 위로받기', { rice: 1 }),
  m('샌드위치', '🥪', '양식', 'L', 1, '가볍게 한 입, 바쁜 날의 친구', {}),
  m('치킨', '🍗', '양식', 'D', 2, '치킨은 언제나 옳다 (진리)', { heavy: 1, meat: 1, greasy: 1, share: 1, booze: 1 }),
  m('브런치', '🥞', '양식', 'L', 2, '여유로운 척 감성 충전', {}),

  // ── 분식 ──
  m('떡볶이', '🌶️', '분식', 'B', 1, '매콤달콤 국민 간식이 한 끼로', { spicy: 2, share: 1 }),
  m('김밥', '🍙', '분식', 'L', 1, '간단하게 먹기 딱 좋아요', { rice: 1 }),
  m('라면', '🍜', '분식', 'L', 1, '오늘은 김치랑 계란 넣어서 끓이기', { soup: 1, spicy: 1, noodle: 1 }),
  m('쫄면', '🥢', '분식', 'L', 1, '새콤매콤 쫄깃쫄깃', { spicy: 2, noodle: 1 }),
  m('돈가스 정식', '🍱', '분식', 'L', 1, '경양식 감성 그대로', { heavy: 1, rice: 1, meat: 1, greasy: 1 }),

  // ── 아시안 ──
  m('쌀국수', '🍜', '아시안', 'B', 1, '고수 유무만 정하면 끝', { soup: 1, noodle: 1 }),
  m('팟타이', '🍤', '아시안', 'B', 2, '새콤달콤 태국식 볶음국수', { noodle: 1, greasy: 1 }),
  m('카레', '🍛', '아시안', 'B', 1, '난이랑 먹을까, 밥이랑 먹을까', { spicy: 1, heavy: 1, rice: 1 }),
  m('반미', '🥖', '아시안', 'L', 1, '바삭한 바게트 속 알찬 재료', { meat: 1 }),
  m('똠얌꿍', '🍲', '아시안', 'B', 2, '새우와 함께하는 새콤매콤 국물', { soup: 1, spicy: 2 }),
  m('나시고랭', '🍳', '아시안', 'B', 1, '인도네시아식 볶음밥 한 접시', { spicy: 1, rice: 1 }),
];

const CUISINES = [
  { id: '한식', emoji: '🍚', sub: '역시 밥심' },
  { id: '일식', emoji: '🍣', sub: '깔끔하게' },
  { id: '중식', emoji: '🥟', sub: '불맛이 그립다' },
  { id: '양식', emoji: '🍝', sub: '분위기 있게' },
  { id: '분식', emoji: '🍢', sub: '가볍고 빠르게' },
  { id: '아시안', emoji: '🍜', sub: '이국적으로' },
];

// a 를 고르면 test 가 true 인 메뉴만, b 를 고르면 false 인 메뉴만 남긴다
const QUESTIONS = [
  { id: 'soup', q: '국물, 있어야 해?',
    a: { emoji: '🥣', label: '국물 필수!', tag: '국물 러버', test: x => x.soup },
    b: { emoji: '🍽️', label: '국물 없이 건더기로', tag: '건더기파' } },
  { id: 'spicy', q: '오늘 입맛은?',
    a: { emoji: '🌶️', label: '매콤한 게 땡겨', tag: '매운맛 도전자', test: x => x.spicy >= 1 },
    b: { emoji: '🍼', label: '순~한 맛이 좋아', tag: '순한맛 평화주의자' } },
  { id: 'heavy', q: '배고픈 정도는?',
    a: { emoji: '🐷', label: '든든하게 꽉 채우기', tag: '든든파', test: x => x.heavy },
    b: { emoji: '🐰', label: '가볍게 적당히', tag: '가볍게파' } },
  { id: 'noodle', q: '면 vs 그 외',
    a: { emoji: '🍜', label: '후루룩 면이 좋아', tag: '면 덕후', test: x => x.noodle },
    b: { emoji: '🍚', label: '면 말고 다른 거', tag: '면 패스' } },
  { id: 'rice', q: '밥이 꼭 있어야 해?',
    a: { emoji: '🍚', label: '밥이 있어야 식사', tag: '밥심 신봉자', test: x => x.rice },
    b: { emoji: '🥖', label: '꼭 밥일 필요는 없지', tag: '자유로운 탄수화물' } },
  { id: 'meat', q: '고기 어때?',
    a: { emoji: '🥩', label: '고기 없으면 섭섭', tag: '육식파', test: x => x.meat },
    b: { emoji: '🐟', label: '고기는 오늘 패스', tag: '고기 쉬는 날' } },
  { id: 'greasy', q: '기름진 것 vs 깔끔한 것',
    a: { emoji: '🍟', label: '기름진 게 최고', tag: '기름진 맛 러버', test: x => x.greasy },
    b: { emoji: '🍃', label: '깔끔하게 먹고 싶어', tag: '깔끔파' } },
  { id: 'price', q: '오늘 지갑 상태는?',
    a: { emoji: '💸', label: '오늘은 좀 쓴다!', tag: '플렉스러', test: x => x.price >= 2 },
    b: { emoji: '🪙', label: '가성비가 최고', tag: '가성비 장인' } },
  { id: 'share', q: '누구랑 먹어?',
    a: { emoji: '👯', label: '같이 나눠 먹기', tag: '나눔의 미학', test: x => x.share },
    b: { emoji: '🧍', label: '내 몫은 내 그릇에', tag: '한 그릇 정신' } },
  { id: 'booze', q: '술 한 잔 곁들일 거야?', dinnerOnly: true,
    a: { emoji: '🍻', label: '캬~ 한 잔 해야지', tag: '술꾼', test: x => x.booze },
    b: { emoji: '🥤', label: '오늘은 맨정신', tag: '건전파' } },
];
