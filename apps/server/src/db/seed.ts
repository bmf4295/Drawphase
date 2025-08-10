import { pool } from './client'
async function main() {
  await pool.query(`insert into users(email, username) values ($1,$2) on conflict do nothing`, ['demo@local','demo'])
  const r = await pool.query('select id,email,username from users limit 5')
  console.log(r.rows)
  process.exit(0)
}
main().catch(e=>{console.error(e);process.exit(1)})