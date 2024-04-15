import express from "express"
import { config } from "dotenv"
import connectDB from "./lib/database.js"
import  serviceRouter  from "./src/router/serviceRouter.js"
import cors from "cors"

const app = express()
config()
app.use(express.json())
connectDB()
app.use(cors())
const port = process.env.PORT



app.use("/service",serviceRouter )






app.use((err,req,res,next)=>{

res.status(err.status||500).send({error:err.message||  "Something went wrong!" })


})


app.listen(port,()=>{

console.log(`[SERVER] running on http://localhost:${port}`)

})