import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // receber o token
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end();
  }

  const [,token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "ec6495cd9a94e4fb190189398dc9933c") as IPayload;
    
    request.user_id = sub;
    
    return next();
  } catch {
    return response.status(401).end();
  }
}