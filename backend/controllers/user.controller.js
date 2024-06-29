import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
// import {uploadOnCloudinary} from '../utils/cloudinary.js'

const updateUser = async(req, res, next) => {
     

    if(req.user.id!=req.params.userId){
            return next(errorHandler(401, "You are not allowed to edit this user"))
    }

    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    
    console.log(req.body)
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        },
            {new:true}
        );

        

        const { password, ...rest} = updatedUser._doc;

        
        res.status(200).json(rest)
    } catch (error) {
        next(error)
        
    }
}

const DeleteUser = async(req, res, next) => {
    if(req.user.id!=req.params.userId){
        return next(errorHandler(401, "You are not able to delete"))
    }

    try {
        await User.findByIdAndDelete(req.user.id)
        return res.json(200).json("user delete succesfully")

    } catch (error) {
        return next(errorHandler(error.message))
    }
}

const signOut = (req, res, next) =>{
    try {
        res.clearCookie('access_token').status(200).json('user signout succesfully')
    } catch (error) {
        next(error)
    }
}



export {updateUser, DeleteUser, signOut}