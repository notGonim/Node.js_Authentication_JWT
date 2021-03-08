import Joi from "@hapi/joi"
import bcrypt from "bcrypt"
import User from "../models/user.js"


//register validation schema
export const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

//login validation schema 
export const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

//check if the email is already in use in our database 
export const checkEmail = async (userEmail) => {
    return await User.findOne({ email: userEmail })
}


//hash the password
export const hashingPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const validPassword = async (userPassword, emailPass) => {
    return await bcrypt.compare(userPassword, emailPass)
}