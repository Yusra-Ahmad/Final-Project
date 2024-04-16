import {model,Schema} from "mongoose"


const required= true

const productSchema = new Schema({
title:{type:String,required},
image:{type:String, required},
description:{type:String,required},
price:{type:Number,required},


})


const Products = model("Products",productSchema)

export default Products