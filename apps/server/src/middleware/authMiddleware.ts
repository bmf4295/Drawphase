import jwt from "jsonwebtoken";

// auth middleware reading JWT from cookie
function requireAuth(req: any, res: any, next: any) {
  const token = req.cookies?.sid
  if (!token) return res.status(401).json({ ok:false, error:'no token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    ;(req as any).auth = decoded
    next()
  } catch {
    return res.status(401).json({ ok:false, error:'invalid token' })
  }
}

export default requireAuth