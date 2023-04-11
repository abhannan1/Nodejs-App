const mongoose = require('mongoose');

db_url = "mongodb://127.0.0.1:27017";

const connection = () =>{
    mongoose.connect(db_url, {useNewUrlParser:true, useUnifiedTopology:true, dbName:"Node"})
    .then(()=>{
        console.log("DB is connected")
    })
    .catch((err)=>{
        console.log("DB connection failed:" + err.message)
    })
}

module.exports = connection 