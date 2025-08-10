import type { Request } from 'express';
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  cookies: Record<string, string>;
  auth?: jwt.JwtPayload | string;
}

export type { AuthenticatedRequest };