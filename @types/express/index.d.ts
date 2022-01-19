// import { IUser } from "../../src/utils/interfaces";
import Iuser from '../../src/utils/interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
