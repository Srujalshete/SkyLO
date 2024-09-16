import  mongoose from "mongoose"; // we use import instead if require by changing made in the package.json files "type": "module" chooseing the module

export const connectDB = async(uri) =>{
    try{   //  use try catch block method with async await
        await mongoose.connect(uri)
        console.log("DB Connected ✅")
    }catch(error){
        console.log("Database connection error:" ,error)
    }
}