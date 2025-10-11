import { DBNAME } from "./constants";




const  connectToDB= async ()=> {
 try{   await mongoose.connect(`{process.env.}`)
    //the object connectioninstance is used to inquire the reason for connection and information
    console.log(`MongoDB connected!! DB Host: ${connectionInstance.connection.host}`) 
 }
 catch(error){
    console.log("MONGODB connection error", error)
    process.exit(1)
 }
}