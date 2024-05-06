import {model,Schema} from "mongoose"


const required= true

const serviceSchema = new Schema({
title:{type:String,required},
description:{type:String,required},
price:{type:Number,required},
duration:{type:String}

})


const Services = model("Services",serviceSchema)

export default Services