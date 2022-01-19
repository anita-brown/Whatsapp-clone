import mongoose, { Schema } from 'mongoose'
import { UserFr }  from '../models/userModel'

const friendSchema = new mongoose.Schema({
    friendId: {
        type: Schema.Types.ObjectId, ref: 'friend',
        // required: [true, 'Friend must belong to UserFriend'],
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'UserFr',
        // required: [true, 'Friend must belong to user'],
        
    }

},
    { timestamps: true },

    //  {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }

)
export const Friend = mongoose.model('Friend', friendSchema)


export default Friend