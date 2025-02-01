import express from "express"
import cors from "cors"

const app=express();

app.use(cors({
    origin:"*",
    credentials:true
}));


app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));


import FAQRouter from "./routes/faq.route.js";

app.use('/api/v1/faq',FAQRouter);

export {app}