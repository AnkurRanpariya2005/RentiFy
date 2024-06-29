import mongoose from "mongoose";

const FurnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pricePerMonth: {
    type: Number,
    required: true
  },

  Quantity:{
    type:Number,
    default:0,
    required:true,
  },

  available: {
    type: Boolean,
    default: true
  },

  imageUrl: {
    type: String,
    required: true
  },
  
},{timestamps: true});

const Furniture = mongoose.model('Furniture', FurnitureSchema);

export default Furniture;
