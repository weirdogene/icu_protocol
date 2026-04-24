# SMC ICU Protocol App

삼성서울병원(SMC) 중환자실 프로토콜을 모바일 앱(Android Play Store 대상)으로 구현한 프로젝트.

## 기술 스택
- Vanilla HTML/CSS/JS (프레임워크 없음)
- 모바일 퍼스트 (428px 기준)
- 각 프로토콜 = 독립 HTML 페이지

## 주요 파일 구조

### 공통
- `styles.css` — 전체 디자인 시스템 (CSS 변수, 카테고리 색상, 다크모드, 언어 전환)
- `protocol.css` — 프로토콜 콘텐츠 레이아웃 (p-group, p-sub, p-item, p-pager, sec-dd 등)
- `settings-init.js` — 첫 페인트 전 테마/폰트/언어 적용 + 다크모드 CSS 인라인 주입
- `recent.js` — 최근 본 페이지 추적 (localStorage, 화이트리스트 regex)

### 페이지
- `index.html` — 메인 (카테고리 그리드, 검색, Recently Viewed)
- `protocols.html` — 프로토콜 전체 목록
- `calculator.html` — 계산기 목록
- `settings.html` — 설정 (테마, 폰트, 언어)
- `{category}.html` — 카테고리별 프로토콜 목록 (neurology, cardiology, pulmonology, gi, nephrology, infection, procedure)
- `{prefix}-toc.html` — 프로토콜 목차 (airway-toc, vap-toc, ecmo-toc, nutr-toc, sup-toc, wean-toc)
- `{prefix}-s{N}.html` — 프로토콜 섹션 페이지
- `calc-{name}.html` — 개별 계산기 페이지

### 프로토콜 현황
| 프로토콜 | prefix | 섹션 수 | 상태 |
|---------|--------|---------|------|
| Airway Management | airway | 11 (9+부록2) | 완료 |
| VAP Prevention | vap | 4 | 완료 |
| VV-ECMO | ecmo | 10 | 완료 |
| ICU Nutrition | nutr | 15 | 완료 |
| Stress Ulcer Prophylaxis | sup | 4 | 완료 |
| Mechanical Ventilation Weaning | wean | 7 | 완료 |

### 원본 문서
- `eng_version/` — 영문 프로토콜 docx 파일 (6개)
- `kor_version/` — 한글 프로토콜 docx 파일 (6개)

## 핵심 패턴

### 이중 언어
- `settings-init.js`가 `<html data-lang="ko|en">` 설정
- CSS: `[data-lang="en"]:not(html) { display: none !important; }` (기본 한국어)
- 콘텐츠: `<span data-lang="ko">한글</span><span data-lang="en">English</span>`
- 블록: `<div data-lang="ko">...</div><div data-lang="en">...</div>`

### 프로토콜 콘텐츠 HTML 클래스
- `p-group` — 소제목 단위 그룹 컨테이너
- `p-sub` — 소제목 (번호: `p-num`)
- `p-item p-l2` — (1), (2) 수준
- `p-item p-l3` — ①, ② 수준
- `p-item p-l4` — • 수준
- `p-item p-l5` — – 수준
- `p-note` — 일반 텍스트 (Normal 스타일)

### 섹션 페이지 네비게이션
- `p-pager` + `pn-btn pn-btn--prev/next` — Prev/Next 카드형 버튼
- `p-toc-btn` — "Back to Contents" 링크
- `sec-dd` — 섹션 목록 드롭다운 패널
- `icon-btn--bookmark` — 저장 버튼

### docx → HTML 변환 규칙
원본 docx의 `w:numPr/w:ilvl` 값으로 계층 결정:
- ilvl 0 → 섹션 제목 (p-sub) 또는 대분류 제목
- ilvl 1 → 소제목 (p-sub)
- ilvl 2 → p-l2 "(1)"
- ilvl 3 → p-l3 "①"
- ilvl 4 → p-l4 "•"
- ilvl 5 → p-l5 "–"
- Normal (ilvl 없음) → p-note

### 캐시 버스팅
모든 CSS/JS 링크에 `?v=1776350000` 사용

### localStorage 키
- `smc-icu-settings` — 설정 (theme, font, lang)
- `smc-recent-pages` — 최근 본 페이지 (최대 5개)
- `smc-bookmark:{filename}` — 저장된 페이지

## 주의사항
- 새 프로토콜 페이지 추가 시 `recent.js`의 화이트리스트 regex 업데이트 필요
- 새 프로토콜 추가 시 `index.html`의 `SEARCH_DATA` 배열에 항목 추가 필요
- 카테고리 페이지의 protocol-card 섹션 수도 업데이트 필요
