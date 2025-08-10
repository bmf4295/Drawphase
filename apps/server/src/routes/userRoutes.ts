import { Router } from 'express';
import {requireAuth} from '../middleware/index.js';
import { pool } from '../db/client'

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';
const router = Router();

router.get('/me', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req.auth as { sub: string }).sub;
  const { rows } = await pool.query<{ id: string; email: string; username: string; }>('select id,email,username from users where id=$1', [userId])
  res.json({ ok: true, user: rows[0] })
})

export default router