import 'dotenv/config'
import { Pool } from 'pg'
export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function dbPing() {
  const r = await pool.query<{ok:number}>('select 1 as ok')
  return r.rows[0]?.ok === 1
}
