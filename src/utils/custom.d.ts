
import {Request} from "express";

import {userAuthModel} from "./models/Users"
export interface CustomRequest extends Request{
  user?:userAuthModel
}
