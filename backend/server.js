import express from "express";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/mongodb.js";
import cors from "cors"
import connectCloudinary from "./config/cloudinary.js";
import postRouter from "./routes/postRoutes.js";



const app = express();  
connectDB();
connectCloudinary()


const PORT = 4000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.get("/",(req,res)=>{
    res.send("API Working")
})

app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

app.listen(PORT, ()=> console.log("App Started on PORT "+ PORT))





