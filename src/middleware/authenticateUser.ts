import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient, connectRedis } from "../redisClient";
import { User } from "../entites/user";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    await connectRedis(); // Redis 연결확인

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(
      token,
      "23YRT23OU13IRUY34TI2U3RO13T2U4GEWYUVHIJOKELMNWGDBHJNKBWRFUHINJKWRBUOJNWBLVBHYJKNRIWJUHBWIER"
    ) as User;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
