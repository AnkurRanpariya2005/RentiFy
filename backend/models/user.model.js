

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: Number,
            required: true,
            unique: true
        },

        address: {
            type:String,
            required: true,
            
        },

        pincode:{
            type: Number,
            required: true,
        },

        password:{
            type:String,
            required: true
        },
        profilePhoto: {
            type: String,
            default: 'https://th.bing.com/th?id=OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        },

        // rentelHistory: [
        //     {
        //       type: Schema.Types.ObjectId,
        //       ref: 'Rental'
        //     }
        //   ],

        isAdmin:{
            type:Boolean,
            default:false
        }
    },{timestamps: true}
)

const User = mongoose.model('User', UserSchema);

export default User;