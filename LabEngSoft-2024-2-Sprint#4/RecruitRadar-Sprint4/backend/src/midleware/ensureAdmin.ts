import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";

interface IPayload {
  sub: string;
}

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try {
    // Validar se token é válido
    const { sub } = verify(
      token,
      //"4f93ac9d10cb751b8c9c646bc9dbccb9"
      config.SECRET
    ) as IPayload;   
     
    if (!(sub==="Admin")) {
        return response.status(401).end();
    }
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}