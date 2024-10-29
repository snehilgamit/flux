import mongoose from "mongoose";

const ConnectMongoDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{dbName:'Flux'})
    }
    catch(e){
        console.log(e)
    }
}
export default ConnectMongoDB