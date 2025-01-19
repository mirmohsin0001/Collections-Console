const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection (replace with your connection string)
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:root@book-store-mern.mfuqgka.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store-MERN'; 
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Route to list all collections
app.get('/api/collections', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name); 
        res.json(collectionNames); 
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ error: 'Failed to fetch collections' });
    }
});

// Route to access data from a specific collection (example)
app.get('/api/data/:collectionName', async (req, res) => {
    try {
        const { collectionName } = req.params;
        const collection = mongoose.connection.db.collection(collectionName);
        const data = await collection.find({}).toArray(); 
        res.json(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));