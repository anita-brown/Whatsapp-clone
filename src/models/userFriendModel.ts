import mongoose, { Schema } from 'mongoose'


const friendSchema = new mongoose.Schema({
    friendId: {
        type: Schema.Types.ObjectId, ref: 'UserAuth',
        required: [true, 'Friend must belong to UserFriend'],
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'UserAuth',
        required: [true, 'Friend must belong to user'],
    }

},

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },

)

friendSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'friendId',
        // select: 'email'

    }).populate({
        path: 'userId',
        select: 'email'
    })
    next();
})

export const Friend = mongoose.model('Friend', friendSchema)


export default Friend