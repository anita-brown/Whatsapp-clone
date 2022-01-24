import { Request } from 'express'
import { IFriends } from "./utils";


export interface ReqUser extends Request {
    user?: IFriends
}