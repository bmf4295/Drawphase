import { pool } from './client'

async function main() {
    await pool.query(`
        create extension if not exists citext;
        create table if not exists users (
            id uuid primary key default gen_random_uuid(),
            email citext unique not null,
            provider text,
            provider_id text,
            username citext unique,
            created_at timestamptz not null default now()
        );
        create table if not exists friends(
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
            status TEXT NOT NULL,
            PRIMARY KEY (user_id, friend_id)
        );
    `);
    console.log('migrations ok');
    process.exit(0);
}
main().catch(err => { console.error(err); process.exit(1) });