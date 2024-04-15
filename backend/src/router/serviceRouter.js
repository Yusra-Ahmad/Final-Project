import {Router} from "express"
import Services from "../models/Services.js"

 const serviceRouter = Router()

serviceRouter.get("/", async(req,res,next)=>{
    try {
        const allServices = await Services.find({})
        res.send(allServices)
    } catch (error) {
        next({status:500,message:error.message})
    }
})

export default serviceRouter