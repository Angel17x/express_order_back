import { User } from "src/domain/schemas/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}