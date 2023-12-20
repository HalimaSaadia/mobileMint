const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mobileMint:mZZK5nRqVIq6DT6l@cluster0.3azmgms.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {

    const mobilesCollection = client.db("mobileMint").collection("mobiles")


    app.get("/mobiles", async(req,res)=> {
      const mobiles = await mobilesCollection.find().toArray()
      res.send(mobiles)
    })

    app.get("/mobile/:id", async(req, res)=> {
      const id = req.params
      const mobile = await mobilesCollection.findOne({_id: new ObjectId(id)})
      res.send(mobile)
    })


 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

  
  app.listen(PORT, () => {
    console.log(` app listening on port http://localhost:${PORT}`)
  })