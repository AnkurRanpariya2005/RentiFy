import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
    
    const token = req.cookies.access_token;
    console.log("@@@@@@@@@@@@@@@@@@@@")
    
    try {
        if (!token) {
            RenewToken(req, res, next);
        } else {
            jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, user) => {
                if (err) {
                    RenewToken(req, res, next);
                } else {
                    req.user = user;
                    next();
                }
            });
        }
    } catch (error) {
        console.log(error.message, "PPPPPP");
    }
}

const RenewToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        // console.log("Refresh token", refreshToken);
        if (!refreshToken) {
            return next(errorHandler(401, "Unauthorized"));
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRETE_KEY, async (err, user) => {
            if (err) {
                return next(errorHandler(401, "Unauthorized"));
            }
            const id = user.id;
            
            try {
                const validUser = await User.findById(id); // Pass the user ID directly
                
                if (!validUser) {
                    return next(errorHandler(401, "User not found"));
                }
                const accessToken = jwt.sign(
                    { id: validUser.id, isAdmin: validUser.isAdmin },
                    process.env.JWT_SECRETE_KEY,
                    { expiresIn: '1m' });

                    req.user = validUser;
                res.cookie('access_token', accessToken, { httpOnly: true });
                
                next();
            } catch (error) {
                console.log(error, "Error finding user");
                return next(errorHandler(500, "Internal server error"));
            }
        });
    } catch (error) {
        console.log(error, "Error renewing token");
        return next(errorHandler(500, "Internal server error"));
    }
}
