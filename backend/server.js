const express = require('express')
const path = require('path');

const app = express()
const port = 3000
const frontendPath = path.join(__dirname, '../frontend');

app.use(express.static(frontendPath));
app.use(express.json());

app.get('/', (req, res) => {
    es.sendFile(path.join(frontendPath, 'index.html'));
})

app.post("/", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  res.json({ message: "Data received successfully", received: data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})