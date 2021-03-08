import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 5,
            max: 25
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 7,
            max: 1000
        },
        date: {
            type: Date,
            default: new Date()
        }
    }
)


const User = mongoose.model('PostMessage', userSchema)
export default User