import jwt from "jsonwebtoken";
import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';


// auth middleware reading JWT from cookie
function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token: string | undefined = req.cookies?.sid
  if (!token) {
    return res.status(401).json({ ok: false, error: 'no token' })
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ ok: false, error: 'server configuration error' })
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.auth = decoded;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: 'invalid token' })
  }
}

export default requireAuth