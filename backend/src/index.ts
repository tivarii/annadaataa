import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectDB } from "./db/db";
import protectedRoute from "./middleware/protectedRoute";
import { addFood } from "./controllers/donation.controller";

dotenv.config({
    path: './.env/' 
  });
const app = express();
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.static('public/temp'))

const port = process.env.PORT || 5000;

connectDB();


app.get("/",(req,res)=>{
    res.json({
        msg:"hello you are on Home",
        url:process.env.MONGODB_URL,
    })
});

app.post("/api/food/donate-food",protectedRoute,addFood as any);




app.listen(port);