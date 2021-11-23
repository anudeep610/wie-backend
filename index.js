require("./db/mongoose");
const express=require("express");
const app=express();
const cors=require("cors");
const env=require("dotenv");

const registerRoute=require("./routes/register");
const viewRoute=require("./routes/view");

env.config();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(registerRoute);
app.use(viewRoute);

app.all("*",(req,res)=>{
    res.status(404).send({message:"Page Not Found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});