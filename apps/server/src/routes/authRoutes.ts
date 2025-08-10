import { Router } from "express";
import passport from "../auth/google.js";
import type { RequestHandler } from "express";

const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler
);

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }) as RequestHandler,
    (req, res) => {
        //we get {user, token } from req.user
        const { token } = req.user as { token: string };
        res.cookie('sid', token, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })
        res.redirect(process.env.WEB_ORIGIN!)
    }
);

router.get('/auth/failure', (_req, res) => res.status(401).json({ ok: false }));

router.post('/auth/logout', (req, res) => {
    res.clearCookie('sid', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
    res.json({ ok: true })
})

export default router