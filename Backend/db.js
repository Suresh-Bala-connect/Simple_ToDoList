const mongoose=require('mongoose')

const db_create= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log('DB Is Created Sucessfully Enjoy U R Coding')
    }
    catch
    {
        console.log("Some Error Came From Code")
    }
}

module.exports= db_create;