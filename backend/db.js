const mongoose = require('mongoose');


const mongoURI="mongodb://127.0.0.1:27017/inotebook"
// mongoose.connect(mongoURI);
console.log("connected")
const connectToMongo= ()=>{
     mongoose.connect(mongoURI) 
     console.log("Connected to mongoose");
}

module.exports=connectToMongo;