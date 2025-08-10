import { Router } from "express";
import passport from "../auth/google.js";


const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
    (req, res) => {
        //we get {user, token } from req.user
        const { token } = req.user as any
        res.cookie('sid', token, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })
        console.log(res.cookie)
        res.redirect(process.env.WEB_ORIGIN!)
    }
);

router.get('/auth/failure', (_req, res) => res.status(401).json({ ok: false }));

router.post('/auth/logout', (req, res) => {
    res.clearCookie('sid', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
    res.json({ ok: true })
})

export default router