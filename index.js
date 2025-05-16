const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m04mdui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.m04mdui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // insert data to data base
    const coffeesCollection = client.db('coffeeDB').collection('coffees')


    // 2nd work
    // database teke get korte hobe jodi ui te dekhat ehoy
    app.get('/coffees', async(req,res)=>{
      // const cursor = coffeesCollection.find();
      // const result = await cursor.toArray()

      const result =  await coffeesCollection.find().toArray()

      res.send(result)

    })

    // 1st work
    app.post('/coffees', async(req,res)=>{
      const newCoffee = req.body
      
      const result = await coffeesCollection.insertOne(newCoffee);
      res.send(result);
      console.log(newCoffee);

    })

    // find one 
    app.get("/coffees/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await coffeesCollection.findOne(query);
      res.send(result)
    })


    // updated method
    app.put('/coffees/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {_Id : new ObjectId(id)};
       const options = { upsert: true };
       const updatedCoffee = req.body;
       const updatedDoc = {
        $set : updatedCoffee
       }

       const result = await coffeesCollection.updateOne(filter, updatedDoc, options);
       res.send(result)

    })

    // 3d delete work 
    app.delete("/coffees/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await coffeesCollection.deleteOne(query);
      res.send(result)
    })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);



// /////////////////////////////////

app.get('/', (req, res)=>{
       res.send("coffee server is getting hotter")
});

app.listen(port , ()=>{
       console.log(`this coffee server is runing on port ${port}`);
});