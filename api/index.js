const express = require('express')
const app = express();
const { mongoose } = require('mongoose');  
const dotenv = require('dotenv');
const Data = require("./Models/Data");
const Image = require("./Models/Background")
const dataRoute =require('./routes/data')
const sendmail = require('./sendEmail');

const cors = require("cors");

dotenv.config();
app.use(express.json())

mongoose
    .connect(process.env.Mongo_URL)
    .then(()=> console.log("DB Connection successfull"))
    .catch((err)=>console.log(err));


app.use(cors());



app.post("/api/", async (req, res) => {
        const newData = new Data(req.body);
        
      
        try {
          const savedData = await newData.save();
          res.status(200).json(savedData);
        } catch (err) {
          res.status(500).json(err);
        }
      });

app.post("/api/image", async (req,res)=>{
    const newImage= new Image(req.body)
    
    try{
        const imagesaved = await newImage.save();
        res.status(200).json(imagesaved);
    }catch(err){
        res.status(500).json(err);
    }

      
})

//GET PRODUCT
app.get("/api/find", async (req, res) => {
    try {
        const imageq = await Image.find();
      res.status(200).json(imageq);
    } catch (err) {
      res.status(500).json(err);
    }
  });



app.delete("/delete/:id", async (req, res) => {
    try {
      await Image.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.listen(5000, ()=>{
    console.log("backend is running")
})


// Email Sending

app.post('/sendEmail', (req, res) => {
  const {title, gender, img} = req.body

  sendmail(title, gender, img, function(err,data){
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json({message:"email sent"})
    }
  })
});