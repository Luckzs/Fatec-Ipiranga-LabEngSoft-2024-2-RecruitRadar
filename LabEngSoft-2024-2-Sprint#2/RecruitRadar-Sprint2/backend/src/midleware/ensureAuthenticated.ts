import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";

interface IPayload {
  sub: string;
  email: string;
}

export function ensureAuthenticated(
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
    const { sub,email } = verify(
      token,
      //"4f93ac9d10cb751b8c9c646bc9dbccb9"
      config.SECRET
    ) as IPayload;

   

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}