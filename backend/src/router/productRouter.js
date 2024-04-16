import {Router} from "express"
import Products from "../models/Products.js"

 const productRouter = Router()

productRouter.get("/", async(req,res,next)=>{
    try {
        const allproducts = await Products.find({})
        res.send(allproducts)
    } catch (error) {
        next({status:500,message:error.message})
    }
}) 

export default productRouter