import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'

dotenv.config();

const app = express();
app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log("Listening")
})


app.use('/auth',AuthRoute)
// app.use('/todo',ToDoRoute)