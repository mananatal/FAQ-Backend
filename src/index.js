import { app } from "./app.js";
import { dbConnect } from "./db/dbConnect.js";
import  dotenv from "dotenv"
dotenv.config();

const PORT=process.env.PORT || 8000;

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("App is up and running on PORT: ", PORT);
    })
})
.catch((error)=>console.error("Error while connecting to mongoDB: ",error));

