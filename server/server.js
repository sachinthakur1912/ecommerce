const express = require('express')
const app = express();
const router = require('./routes/useRoute');

const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
    res.json({
        message:"This is an example"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`)
})
// middlewares
app.use(express.json());

app.use('/user',router);
// db connect 
const db = require("./config/database");

db.connect();