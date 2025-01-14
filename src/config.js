const mongoose=require('mongoose');
const connectionString = "mongodb+srv://<username>:<password>@cluster0.wo8yk.mongodb.net/<yourDatabaseName>?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(connectionString)
  .then(() => {
    console.log("Database connected successfully to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
//create schema
const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
});
const collection=new mongoose.model("users",loginSchema);
module.exports=collection;

