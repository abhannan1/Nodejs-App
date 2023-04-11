const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    email:{
        type:"string",
        require:true
    },
    tittle:{
        type:"string",
        require:true
    },

    message:{
        type:"string",
        require:true
    }
    
},
{ timestamps: true }
)

module.exports = mongoose.model("message", messageSchema)