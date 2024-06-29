import { errorHandler } from "../utils/error.js"
import Furniture from '../models/furniture.model.js'

const addFurniture = async(req, res, next) => {

    // getting details from body
    const {name, description, pricePerMonth, Quantity, imageUrl } = req.body;

    if(!name || ! description || !pricePerMonth || !Quantity || !imageUrl || name == '' || description =='' || pricePerMonth == '' || Quantity == '' || imageUrl == ''){
        // we use errorhandler here because we know that our middlware takes error as a argument but we doesn't have an error (in catch() we have error that's why we doesn't use error handler their). So we create our custom error in errorhandler from utils folder which return error by taking 2 arguent)
        next(errorHandler(400, "All field is required" ))
    }

   
    // create data to save data
    const newFurniture = new Furniture({
       name, 
       description,
       pricePerMonth,
       Quantity,
       imageUrl
    });

    // if no error then save to databases
    try {
        await newFurniture.save();
        return res.status(200).json("Furniture added Successfully")

    } catch (error) {
        // pass to the middleware for handling error
        next(error);
    }
    
}