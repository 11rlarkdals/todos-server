import { JwtPayload } from "jsonwebtoken";
import { User } from "../../entites/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // 또는 필요한 사용자 타입으로 변경
  }
}
