const express = require('express');
const path = require('path');
const { client } = require('./config/mongoConfig');
const app = express();
const port = process.env.DOMAIN || 3000;
const frontendPath = path.join(__dirname, '../frontend');

require('dotenv').config();

// Middleware
app.use(express.static(frontendPath));
app.use(express.json());

// Get Request
app.get('/', (req, res) => {
    es.sendFile(path.join(frontendPath, 'index.html'));
});

//Initialize MongoDB connection
client.connect().then(()=>{
  console.log("connected");
}).catch(()=>{
  console.log("failed connection");
})

// Post Request 
app.post("/", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  res.json({ message: "Data received successfully", received: data });
});

// App Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});