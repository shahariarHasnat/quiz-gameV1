const express = require('express');
const app = express();
const port = 5000; // You can choose any available port number

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});