# TAG × 남도마켓 협업 미팅 페이지 (Next.js)

미팅에서 바로 띄워 보여줄 단일 페이지 사이트입니다. 인터랙티브 가격 계산기, 런칭 캘린더, 마케팅 시나리오, 체크리스트를 포함합니다.

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:3000
```

배포용 빌드:

```bash
npm run build
npm start
```

## 구성
- `app/page.tsx` — 메인 페이지 (히어로 · 수익구조 계산기 · 정산 · 캘린더 · 마케팅 · 체크리스트)
- `app/globals.css` — 다크 테마 스타일
- `app/layout.tsx` — 레이아웃/메타데이터

## 메모
- 가격 계산기는 도매가 배수(1.8~2.2배)를 슬라이더로 조절하면 TAG 순수익을 실시간 계산합니다. (PG수수료·도매원가 반영, 배송비는 고객 부담 전제)
- `node_modules`, `.next` 폴더는 삭제 후 다시 `npm install` 하셔도 됩니다.
