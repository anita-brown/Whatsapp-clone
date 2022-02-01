import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/MessageModel';
import { CustomRequest } from '../utils/custom';




export const deleteMessagePrivate = async (req: CustomRequest, res: Response, next: NextFunction) => {
try {
    


} catch (error) {
    
}
    return res.status(500).json({Error});
}


export const deleteMessageGroup = async (req: CustomRequest, res: Response, next: NextFunction) => {
try {
    



} catch (error) {
    
}
    return res.status(500).json({Error});

}