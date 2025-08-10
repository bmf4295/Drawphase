import { Router } from 'express';
import {requireAuth} from '../middleware/index.js';
import { pool } from '../db/client'

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).auth.sub
  const { rows } = await pool.query('select id,email,username,avatar_url from users where id=$1', [userId])
  res.json({ ok: true, user: rows[0] })
})

export default router