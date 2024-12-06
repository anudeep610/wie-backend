require("./db/mongoose");
const express=require("express");
const app=express();
// const cors=require("cors");
const env=require("dotenv");

const registerRoute=require("./routes/register");
const viewRoute=require("./routes/view");

env.config();
const cors = require('cors');
app.use(cors({
    origin: '*', // Adjust this to your frontend domain
}));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.use(registerRoute);
app.use(viewRoute);
app.get("/",(req,res) => {
    res.status(200).send({message:"Request successfull"});
})
// app.all("*",(req,res)=>{
//     res.status(404).send({message:"Page Not Found"});
// });
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});