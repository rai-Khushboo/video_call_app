import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from './route/authRoute.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//  Check environment variables
console.log("PORT:", process.env.PORT);
console.log("Mongo URI:", process.env.MONGOOSE_CONNECTION);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const allowedOrigins = [""];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, 
  credentials : true, 
  methods : ['GET' , 'POST' , 'PUT' , 'DELETE']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth' , authRoute);

app.get('/' , (req , res)=>{
    res.json("hey hi , it's a home page");
})

app.listen(PORT , async () => {
    await dbConnect();
    console.log(`Server is running on the port ${PORT}`);
})
