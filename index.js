const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

// nazmulofficial
// uCWZHdBoMICjvzwh


const uri = "mongodb+srv://nazmulofficial:uCWZHdBoMICjvzwh@cluster0.ctqp5xj.mongodb.net/?retryWrites=true&w=majority";

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

        await client.connect();

        const companyCollection = client.db("AtenDB").collection("company");
        const cartCollection = client.db("AtenDB").collection("cart");

        app.get('/brands', async (req, res) => {
            const cursor = companyCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/cart', async (req, res) => {
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/company/:id', async (req, res) => {
            const id = req.params.id;
            const query = { companyName: id };
            const find = companyCollection.find(query)
            const result = await find.toArray();
            res.send(result)
        });

        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await companyCollection.findOne(query);
            res.send(result);
        });

        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await companyCollection.findOne(query);
            res.send(result);
        })

        app.post('/product', async (req, res) => {
            const product = req.body;
            const result = await companyCollection.insertOne(product);
            res.send(result);
        });

        app.post('/cart', async (req, res) => {
            const cartDoc = req.body;
            const result = await cartCollection.insertOne(cartDoc)
            res.send(result);

        });

        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const filter = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const updatedDoc = {
                $set: {
                    photoUrl: updatedData.photoUrl, price: updatedData.price, productName: updatedData.productName, companyName: updatedData.companyName, category: updatedData.category, rating: updatedData.rating, description: updatedData.description
                }
            };
            const result = await companyCollection.updateOne(filter, updatedDoc, option)
            res.send(result)
        })

        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('my assaingment server is running')
});

app.listen(port, () => {
    console.log('Assaingment server in running on PORT:', port);
})