import express from "express"
import { checkEmail, hashingPassword, loginValidation, registerValidation, validPassword } from "../controllers/validations.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken";
const router = express.Router()


router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //check user email existence
    const emailExist = await checkEmail(req.body.email)
    if (emailExist)
        return res.status(400).send('Email already exists')

    //hashing the password
    const hashedPassword = await hashingPassword(req.body.password)

    //created new user
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
    )
    try {
        const saveUser = await user.save()
        res.status(200).send({ user: user._id })

    } catch (err) {
        res, status(404).json({ message: err.message })
    }
})


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //check if email exists
    const user = await checkEmail(req.body.email)
    if (!user)
        return res.status(400).send('Email doesn`t exists')
    //check if password is correct
    const validPass = await validPassword(req.body.password, user.password)
    if (!validPass)
        return res.status(400).send('Invalid Password')

    //create and send token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRETE)
    res.header('auth_token', token).status(200).send('user logged in')
})

export default router
