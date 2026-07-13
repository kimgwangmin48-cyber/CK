# Solarix AI

개인 PRD 기반 프로젝트 — 태양광 발전소의 예측 발전량과 실제 발전량을 비교해 이상 징후를 정상/주의/경고/이상 단계로 알려주는 에이전트.

## Current status: frontend demo

실제 예측 모델(XGBoost/RF) 없이, `src/data/mockData.js`의 목업 데이터로 화면 흐름만 구현한 상태입니다.

### Screens

- **대시보드** (`/`) — 오늘 상태(정상/주의/경고/이상), 예측·실제 발전량, 추정 원인(날씨/원인불명), 최근 7일 차트. "간단히 보기" 토글로 복잡한 수치 없이 상태만 볼 수 있음.
- **발전 이력** (`/history`) — 일별 예측 vs 실제 발전량, 부족률, 상태, 원인 목록 + 심각도 필터.

### Tech stack

React + Vite, Tailwind CSS v4, React Router

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
