
import  { Request, Response } from "express";
import{UserFr} from "../models/userModel"
import { ReqUser } from "../utils/customReq";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mySecret = "ughyjkkoiughjkhu3jkhu748uhjki78h";


// Get all Users

export const getAllUser = (req: Request, res: Response) => {
    try {
        const data = UserFr.find({}, (err: any, users: ReqUser) => {
            if (err) return res.json({ message: "error occur in getting all users..." });
            if (users) {
                res.json(users);
            }
        });
    } catch (error) {
        console.log(error, "error occured.");
        res.status(500).json({ error });
    }
};

// Sign up

export const signUp = async (req: Request, res: Response) => {
    try {
        const { error } = (req.body);
        if (error) {
            return res.status(400).json({ msg: "Validation failed..." });
        }
        console.log(req.body)
        const { firstName, lastName, email,password } = req.body;
        const data = await UserFr.create({ firstName, lastName, email, password});

        console.log(data)
        const token = await jwt.sign(
            {
                email,
            },
            mySecret,
            {
                expiresIn: "30d",
            }
        );

        res.status(201).json({ status: "success", token, data });

    }
    catch (error) {
        console.log(error, "error occured.");

        res.status(500).json({ error });
    }
};



