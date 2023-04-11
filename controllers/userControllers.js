const userSchema = require("../models/users");
const JWT = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt")

const checkEmail = (mail) => {
  return validator.isEmail(mail);
};

const userRegister = async (req, res)=>{
    const {name, email, password} = req.body;
    console.log(req.body)

    try{
        if(!name || !email || !password){
            throw Error("Please Fill out all fields")
        }
        if(!checkEmail(email)){
            throw Error("Please enter a valid Email address")
        }
        if(name.length<3 || name.length>30){
            throw Error("Name should be between 3 to 30 characters long")
        }
        if(password.length<8){
            throw Error("Password must be at least 8 characters long")
        }
        const match = await userSchema.findOne({email})
        if(match){
            throw Error("User already registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userSchema.create({name, email, password:hashedPassword})
        res.status(200).send(user)

    } catch(error){

        res.status(400).send({error:error.message})
    }
}


const userLogin = async (req, res)=>{
    const { email, password } = req.body;
    console.log(req.data)
    try {
        if(!email || !password){
            throw Error("Please fill all fields")
        };
        if(!checkEmail(email)){
            throw Error("Please enter a valid email address")
        };
        if(password.length<8){
            throw Error("Password must be at least 8 characters long")
        };
        const match = await userSchema.findOne({email})
        if(!match){
            throw Error("Invalid Credentials")
        };

        const isMatch = await bcrypt.compare(password, match.password) ;

        if(!isMatch){
            console.log(hashedPassword)
            return res.render("login", {email, message:"Incorrect Password"})
        };
    
        const Token = JWT.sign({_id:match._id, email:match.email}, process.env.SECRET)
    
        res.cookie("Token",Token)
        // res.redirect("/message")
        res.status(200).send({
            User:{
            name:match.name,
            email:match.email
            }, 
            Token})
       
    }
    catch(error){
        res.status(400).send({error:error.message})
    };
    }

const userLogout = (req, res)=>{
    res.clearCookie("Token")
    console.log("logged out")
    res.send("logged out successfully")
}


module.exports = {
    userLogin,
    userLogout,
    userRegister
}