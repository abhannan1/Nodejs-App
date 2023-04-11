const mongoose = require("mongoose");
const messageSchema = require("../models/messages")
const validator = require("validator");
const userSchema = require("../models/users");


const checkEmail = (mail) => {
    return validator.isEmail(mail);
  }


const addMessage = async (req, res)=>{
    const {email, tittle, message} = req.body;
    try{
        if(!email || !tittle || !message){
            throw Error ("Please fill out all fields")
        }
        if(!checkEmail(email)){
            throw Error ("Please enter a valid email address")
        }
        if(email!=req.data.email){
            throw Error ("This is not your email address")
        }
        const newMessage = await messageSchema.create({email, tittle, message})

      const some = await userSchema.findByIdAndUpdate(
            {_id:req.data._id},
            {$push: {messages:newMessage._id}}
            )

        res.send(some)
    } catch(error){
        res.status(400).send({error:error.message})
    }
}


const deleteMessage = async (req, res) =>{
    const {_id} = req.params;

    if (!mongoose.isValidObjectId(_id)){
        return res.status(400).send("Invalid ID")
    }
    try{
        const message = await messageSchema.findByIdAndDelete(
            _id,
            {new:true}
        )
        if(!message){
            return res.status(404).send("Message not found")
        }
        res.status(200).send(message)
    } catch(error){
        res.status(500).send({error:error.message})
    }
}

const updateMessage = async (req, res) =>{
    const {_id} = req.params;
    const {tittle, message} = req.body;

    if(!mongoose.isValidObjectId(_id)){
       return  res.status(400).send("Invalid ID")
    }
    
    try{
        const updatedMessage = await messageSchema.findByIdAndUpdate(
            _id,
            {$set:{tittle, message}},
            {new:true}
        )
        res.status(200).send(updatedMessage)
    } catch(error){
        res.status(500).send({error:error.message})
    }
}


const getMessage = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send("Invalid ID")
    }
    try{
        const message = await messageSchema.findById(id).catch(()=>null)
        if(!message){
            throw Error ("Message not found")
        }
        res.status(200).send(message)
    } catch(error){
        res.status(500).send({error:error.message})
    }
} 


const getAllMessages = async (req, res)=>{
    const {_id} = req.data;
    console.log(_id)
    if(!mongoose.isValidObjectId(_id)){
        return res.status(400).send("Not a registered User")
    }

    try{
        const user = await userSchema.findById(_id);
        if(!user){
            return res.status(404).send("User not found");
        }
        const matchMessages = await userSchema
       .findById({ _id })
       .populate("messages");
        const msgs = matchMessages.messages;
        msgs.sort((e1, e2) =>
        e1.createdAt > e2.createdAt ? -1 : e1.createdAt < e2.createdAt ? 1 : 0
        )
        res.status(200).send(matchMessages);
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}


module.exports = {addMessage, updateMessage, deleteMessage, getMessage, getAllMessages}