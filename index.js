const { json } = require("express");
const express = require("express");
const connection = require("./connection/Dbconfig");
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes")
const messageRouter = require("./routes/messageRoutes")
const dotenv = require("dotenv").config();
const {checkingToken} = require("./routes/Authentication/checkingToken")
const cookieParser =  require("cookie-parser")





const app = express();
connection()
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(bodyParser.urlencoded({limit:'30mb', extended:'true'}));

app.use(["/message","/addMessage", "/getAllMessages", "/getMessage/:id", "/updateMessage/:id", "/deleteMessage/:id"],checkingToken)

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/", userRouter);
app.use("/", messageRouter);

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    // console.log(__dirname)
    // const pathLocation = path.resolve();
    // res.sendFile(path.join(pathLocation, './index.html'))
    res.render("login")
    // res.sendFile("index.html")
})

app.get('/register',(req, res)=>{
    res.render("register")
})
app.get('/message',(req, res)=>{
    res.render("message")
})

app.get('/success',(req, res)=>{
    res.render("success")
})


app.get("/users",(req, res)=>{
    res.json({
        messages,
    })
})




   
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is listening to the port ${PORT}`)
})