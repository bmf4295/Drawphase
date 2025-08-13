import { Router } from "express";
import { requireAuth } from '../middleware/index.js';
import { pool } from '../db/client'
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';
import type { QueryResult } from "pg";

type FriendAddBody = { friendId: string };

const router = Router();
//route to get friends of a user
router.get('/friends', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req.auth as { sub: string }).sub;
    if (!userId) {
        return res.status(400).json({ ok: false, error: "No userId found" });
    }
    try {
        const { rows } = await pool.query<{ id: string; username: string }>('SELECT u.id, u.username FROM friends f JOIN users u ON f.friend_id = u.id WHERE f.user_id = $1',
            [userId])
        res.json({ ok: true, friends: rows })
    } catch (err) {
        return res.status(500).json({ ok: false, error: err });
    }
});

//route to add a friend
router.post('/friends/add', requireAuth, async (req: AuthenticatedRequest & { body: FriendAddBody }, res: Response) => {
    const userId = (req.auth as { sub: string }).sub;
    const { friendId } = req.body as FriendAddBody;
    if (!friendId || friendId === userId) {
        return res.status(400).json({ ok: false, error: "Invalid friendId" });
    }

    try {
        //check if friend exists
        const { rowCount } = await pool.query('SELECT 1 FROM users WHERE id = $1', [friendId]);
        if (rowCount === 0) {
            return res.status(404).json({ ok: false, error: "User not found" });
        }

        //check if there is already a pending request from the user
        const pendingFriendReqExists: QueryResult = await pool.query('SELECT 1 from friends WHERE user_id = $1 AND friend_id = $2 AND status = $3', [friendId, userId, 'pending']);
        if ((pendingFriendReqExists.rowCount ?? 0) > 0) {
            //accept the request if there is one
            await pool.query('UPDATE friends SET status=$1 WHERE (user_id = $2 AND friend_id = $3) OR (user_id = $3 AND friend_id = $2)', ['accepted', userId, friendId])
            return res.json({ ok: true, status: 'accepted' });
        }
        //if there is not insert a pending request into the database
        await pool.query('INSERT INTO friends (user_id, friend_id, status) values ($1, $2, $3) ON CONFLICT DO NOTHING', [userId, friendId, 'pending'])
        res.json({ ok: true, status: 'pending' })



    } catch (err) {
        return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : err });
    }
})

//route to remove friends
router.delete('/friends/remove/:friendId', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req.auth as { sub: string }).sub;
    const friendId = req.params.friendId;

    if (!friendId || friendId === userId) {
        return res.status(400).json({ ok: false, error: "Invalid friendId" });
    }

    try {
        const result = await pool.query('DELETE FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)', [userId, friendId])
        if(result.rowCount === 0) {
            return res.status(404).json({ ok: false, error: "Friend not found" });
        }
        res.json({ ok: true, status: 'deleted' })
    } catch (err) {
        return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : err });
    }
});
export default router