const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:"string",
        require:true,
    },

    email:{
        type:"string",
        require:true,
    },

    password:{
        type:"string",
        require:[true,"Password is required"],
        minlength:[8, "Password must be at least 8 characters long"]
    },

    messages:[{
        ref:"message",
        type:mongoose.Types.ObjectId,
    },
],
})

module.exports = mongoose.model("user", userSchema)