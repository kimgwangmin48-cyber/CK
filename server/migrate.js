import 'dotenv/config'
import { pool } from './db.js'

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
]

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Add it to .env (local) or the Render environment (deployed).')
    process.exit(1)
  }

  for (const statement of statements) {
    await pool.query(statement)
  }

  console.log('Migration complete: users table is ready.')
  await pool.end()
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
