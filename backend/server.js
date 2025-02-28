import express from "express";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/mongodb.js";


const app = express();  
connectDB();


const PORT = 4000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.use("/api/user",userRouter)

app.listen(PORT, ()=> console.log("App Started on PORT "+ PORT))





