const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
       res.send("coffee server is getting hotter")
});

app.listen(port , ()=>{
       console.log(`this coffee server is runing on port ${port}`);
});