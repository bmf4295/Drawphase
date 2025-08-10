import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken'
import { pool } from '../db/client.js' // your pg Pool
import 'dotenv/config'

type DBUser = {
    id: string; email: string; username: string | null;
}

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
        (async () => {
            try {
                const email = profile.emails?.[0]?.value
                if (!email) {
                    return done(new Error('No email found in Google profile'))
                }

                const providerId = profile.id
                const provider = 'google'

                const query = `
                    insert into users (email, provider, provider_id, username)
                    values ($1, $2, $3, $4)
                    on conflict (email) do update
                        set provider_id = excluded.provider_id
                    returning id, email, username;
                `

                const username = profile.username || email.split('@')[0]
                const { rows } = await pool.query<DBUser>(query, [email, provider, providerId, username])
                const user = rows[0]

                if (!user) {
                    return done(new Error('Failed to create or find user'))
                }

                const token = jwt.sign(
                    { sub: user.id, email: user.email },
                    process.env.JWT_SECRET!,
                    { expiresIn: '7d' }
                )
                return done(null, { user, token })
            } catch (e) {
                return done(e as Error)
            }
        })().catch(err => done(err as Error)) // Add this line
    }
))

export default passport