import { IUser } from './../src/utils/interface';
import 'express-session';

declare module 'express-session' {
  interface Session {
    passport: IUser;
    destroy: Function
  }
}
