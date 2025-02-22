import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();



app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both 3000 & 3001
    credentials: true
}));


app.use(express.json()); 
app.use(express.json({limit : "10mb" }));
app.use(express.urlencoded({extended : true , limit : "10mb"}));
app.use(express.static("public"))
app.use(cookieParser());



import UserRouter from './routes/user.routes.js';
app.use("/api/v1/users",UserRouter)

export {app}
