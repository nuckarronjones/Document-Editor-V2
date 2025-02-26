const express = require('express')
const path = require('path');

const app = express()
const port = 3000
const frontendPath = path.join(__dirname, '../frontend');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    es.sendFile(path.join(frontendPath, 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})