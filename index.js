

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotEnv from 'dotenv';


import auth from "./routes/auth.js"


dotEnv.config()


const app = express()
// setting up the body parser so it can properly sending our request
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/api/user', auth)


const PORT = process.env.PORT || 5000

// connecting to DB 
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(PORT, () => { console.log('server is running') }) })
    .catch((err) => { console.log(err.message) })

mongoose.set('useFindAndModify', false)