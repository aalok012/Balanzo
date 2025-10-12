import dotenv from 'dotenv'; 
import connectToDB from "./db/index.js"

dotenv.config();


connectToDB()

. then(()=> {app.listen(process.env.PORT|| 8000,()=> {
    console.log(`Server is running at port${process.env.PORT}`);
})
})
.catch((error)=>{
    console.log("DB not connected!", error)
})