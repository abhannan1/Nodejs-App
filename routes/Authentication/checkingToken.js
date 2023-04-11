const JWT = require("jsonwebtoken")

const checkingToken = async (req,res,next) => {
    const token = req.cookies["Token"]
    // console.log(Token)

    if (token==null){
        return res.status(400).send("Please Login")
    }
    try{
        const user = await JWT.verify(token, process.env.SECRET);
        console.log(user)
        req.data = user;
        next();

    } catch(error){
        res.send({Error:"Please login again"})
    }
}

module.exports = {checkingToken}


// const checkingToken = (req,res,next) => {
//     const token = req.cookies["Token"]
//     // console.log(Token)

//     try{
//         if (!token){
//             throw Error("Please Login")
//         }
//         JWT.verify(token, process.env.SECRET, (err, user)=>{

//             if(err){
//                 throw Error("Please Log in again")
//             }
//             else{
//                 req.data = user
//                 // console.log(req.data)
//                 next()
//             }
//         })
//     } catch(error){
//         res.send({Error:error.message})
//     }
// }