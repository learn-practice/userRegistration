const mongoose = require('mongoose');
const env = require('dotenv');
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb+srv://deshmukhvaishnavi2207:AouD3nNmNmQKWG55@cluster0.hlnzr.mongodb.net/";
const connect = mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
 console.log("database connected")
}).catch((error)=>{
    console.error('Error in connecting database',error);
})

module.exports = connect;