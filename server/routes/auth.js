import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db.js'

const router = Router()

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [email, name ?? null, passwordHash]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'an account with that email already exists' })
    }
    console.error(err)
    res.status(500).json({ error: 'signup failed' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  try {
    const result = await query('SELECT id, email, name, password_hash FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    const passwordMatches = user && (await bcrypt.compare(password, user.password_hash))

    if (!passwordMatches) {
      return res.status(401).json({ error: 'invalid email or password' })
    }

    const { password_hash, ...safeUser } = user
    res.json(safeUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'login failed' })
  }
})

export default router
