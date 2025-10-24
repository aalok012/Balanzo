import dotenv from 'dotenv'; 
import connectToDB from "./db/index.js"
import app from './app.js';
dotenv.config();



connectToDB()

. then(()=> { app.listen(process.env.PORT|| 8000,()=> {
    console.log(` Well done Alok!! Server is running at PORT: ${process.env.PORT}`);
})
})
.catch((error)=>{
    console.log("DB not connected!", error)
}) 