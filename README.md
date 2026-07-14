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

## Database (Part 5)

The `server/` folder is a small Express API backed by PostgreSQL: `server/db.js` opens the connection pool from `DATABASE_URL`, `server/migrate.js` creates the `users` table, and `server/routes/auth.js` exposes `POST /api/signup` and `POST /api/login` (passwords hashed with bcrypt, SQL uses parameterized queries).

### One-time setup on Render

1. Render Dashboard → **New +** → **Postgres** → same region as the web service → Free tier → Create Database.
2. On the database page, open **Connect** and copy the **Internal Database URL**.
3. On the web service → **Environment** → add `DATABASE_URL` = that internal URL → Save (redeploys).

### Local development

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to the database's **External** connection string (from the same Connect menu).
2. Run the migration once: `npm run migrate`
3. Start the API: `npm run dev:server` (serves on `PORT`, default 3000)
4. In another terminal, run the frontend as usual: `npm run dev`

`.env` is gitignored — never commit it, it contains the database password.

### Deployed start command

`npm start` builds the frontend and runs `node server/index.js`, which serves the built `dist/` files and the `/api/*` routes from one process — matching Render's single web-service setup.
