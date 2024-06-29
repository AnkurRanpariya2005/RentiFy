import Express from "express";
import dotenv from 'dotenv';


import cors from 'cors'
import bodyParser from 'body-parser'
dotenv.config()


const app = Express();

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', router)

app.listen(PORT, ()=>{
    console.log("App is ruuning on ",PORT)
})