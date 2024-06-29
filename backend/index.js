import Express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'
import cookieParser from 'cookie-parser'



import cors from 'cors'
import bodyParser from 'body-parser'
dotenv.config()


const app = Express();

const PORT = 8000;

app.use(cors({origin: "http://localhost:5173", credentials: true}))
// app.use(cors({
//     credentials:true,
//     origin: 'http://localhost:5173/',
// }));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Mongobd databses
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongoose connected Sucessulggul   "))
.catch((err) => console.log(err))


app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.get('/api/profile', (req,res) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@");
    const {token} = req.cookies.access_token;

    console.log(token);
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });

app.listen(PORT, ()=>{
    console.log("App is ruuning on ",PORT)
})