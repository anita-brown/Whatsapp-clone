
import  { Request, Response } from "express";
import{UserFr} from "../models/userModel"
import { reqUser } from "../utils/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mySecret = "ughyjkkoiughjkhu3jkhu748uhjki78h";


// Get all Users

export const getAllUser = (req: Request, res: Response) => {
    try {
        const data = UserFr.find({}, (err: any, users: reqUser) => {
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



// // Login 

// export const logIn = async (req: Request, res: Response) => {
//     try {
//         console.log(req.body)
//         const { error } = (req.body);
//         if (error) {
//             return res.status(401).json({ msg: "Validation failed..." });
//         }
//         const { email, password } = req.body;
//         const data = await UserFr.findOne({ email }).select('+password')


//         let isMatch = await bcrypt.compare(password, data.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 errors: [
//                     {
//                         message: "Invalid Credentials",
//                     },
//                 ],
//             });
//         }

//         const token = await jwt.sign(
//             {
//                 email,
//             },
//             mySecret,
//             {
//                 expiresIn: "30d",
//             }
//         );

//         res.status(201).json({ status: "success", token, data });

//     }
//     catch (error) {
//         console.log(error, "error occured.");

//         res.status(500).json({ error });
//     }
// };



// // //  Authentication custom middleware
// export const checkAuth = async (
//     req: reqUser,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         if (!req.headers.authorization) {
//             return res.status(400).json({
//                 error: [
//                     {
//                         msg: "No token found!!",
//                     },
//                 ],
//             });
//         }

//         const token = req.headers.authorization.split(" ")[1];

//         if (!token) {
//             return res.status(400).json({
//                 error: [
//                     {
//                         msg: "No token found",
//                     },
//                 ],
//             });
//         }
//         let user = (await jwt.verify(
//             token,
//             "ughyjkkoiughjkhu3jkhu748uhjki78h"
//         )) as { [key: string]: string };
//         // console.log(user)
//         req.user = user.email;
//         req.user = user.hashedPassword;

//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             errors: [
//                 {
//                     msg: "Token invalid",
//                 },
//             ],
//         });
//     }
// };















// // export const getAllUsers = (req: Request, res: Response) => {
// //   const userData = readUsersFile();
// //   res.status(200).json({ message: "succesfull", userData });
// // };

// // SIGNUP

// // export const signUp = async (req: Request, res: Response) => {
// //   try {
// //     const userData = readUsersFile();

// //     // To check validation of reqbody
// //     [
// //       check("name", "Full name required"),
// //       check("email", "Please provide a valid email").isEmail(),
// //       check("dateOfBirth"),
// //       check(
// //         "password",
// //         "Please provide password greater than 6 characters"
// //       ).isLength({
// //         min: 6,
// //         max: 10,
// //       }),
// //     ];

// //     const { id, name, dateOfBirth, password, email } = req.body;
// //     console.log(req.body, "req data from form");
// //     //  Validate the input
// //     const errors = validationResult(req.body);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({
// //         errors: errors.array(),
// //       });
// //     }

// //     // Validate if user doesn't exist
// //     let userNewData = userData.find((user: Users) => {
// //       return user.email === email;
// //     });
// //     if (userNewData) {
// //       return res.status(400).json({
// //         errors: [
// //           {
// //             msg: "This user already exists",
// //           },
// //         ],
// //       });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     console.log(hashedPassword);

// //     userData.push({
// //       id: uuid4(),
// //       name,
// //       dateOfBirth,
// //       email,
// //       password: hashedPassword,
// //     });
// //     console.log(userData, "user data");

// //     const token = await jwt.sign(
// //       {
// //         email,
// //       },
// //       mySecret,
// //       {
// //         expiresIn: "10d",
// //       }
// //     );

// //     res.json({
// //       token,
// //     });
// //     writeUsersFile(userData);
// //   } catch (err) {
// //     console.log(err, "error occured");
// //   }
// // };

// // // LOGIN
// // export const logIn = async (req: Request, res: Response) => {
// //   const userData = readUsersFile();

// //   const { password, email } = req.body;
// //   let userNewData = userData.find((user: Users) => {
// //     return user.email === email;
// //   });
// //   if (!userNewData) {
// //     return res.status(400).json({
// //       errors: [
// //         {
// //           msg: "Invalid Credentials",
// //         },
// //       ],
// //     });
// //   }

// //   let isMatch = await bcrypt.compare(password, userNewData.password);
// //   if (!isMatch) {
// //     return res.status(400).json({
// //       errors: [
// //         {
// //           msg: "Invalid Credentials",
// //         },
// //       ],
// //     });
// //   }
// //   const token = await jwt.sign(
// //     {
// //       email,
// //     },
// //     "ughyjkkoiughjkhu3jkhu748uhjki78h",
// //     {
// //       expiresIn: "10d",
// //     }
// //   );

// //   res.json({
// //     token,
// //   });
// // };

// // //  Authentication custom middleware
// // export const checkAuth = async (
// //   req: reqUser,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   if (!req.headers.authorization) {
// //     return res.status(400).json({
// //       error: [
// //         {
// //           msg: "No token found!!",
// //         },
// //       ],
// //     });
// //   }

// //   const token = req.headers.authorization.split(" ")[1];

// //   if (!token) {
// //     return res.status(400).json({
// //       error: [
// //         {
// //           msg: "No token found",
// //         },
// //       ],
// //     });
// //   }
// //   try {
// //     let user = (await jwt.verify(
// //       token,
// //       "ughyjkkoiughjkhu3jkhu748uhjki78h"
// //     )) as { [key: string]: string };
// //     // console.log(user)
// //     req.user = user.email;
// //     req.user = user.hashedPassword;

// //     next();
// //   } catch (error) {
// //     console.log(error);
// //     return res.status(400).json({
// //       errors: [
// //         {
// //           msg: "Token invalid",
// //         },
// //       ],
// //     });
// //   }
// // };

// // export default {
// //   getAllUsers,
// //   signUp,
// //   logIn,
// //   checkAuth,
// // };
