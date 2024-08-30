//const mongoose = require('mongoose')
import mongoose from "mongoose";


// schema
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageUrl: {
        type: String,
        unique: true,
    },
    stock: {
        type: Number,
    }
}

)

const ProductsModel = mongoose.model('products', productsSchema);

export default ProductsModel;