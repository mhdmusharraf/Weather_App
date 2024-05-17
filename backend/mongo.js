const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/react-login-tut")
.then(() => {
    console.log("Connected to the database");
})
.catch(()=>{
    console.log("Connection failed");
})

const newSchema = mongoose.Schema({
    email:{
        type:String,
    required:true
    },
    password:{
        type:String,
        required:true
    }

})

const collection = mongoose.model("collection",newSchema);

module.exports=collection;