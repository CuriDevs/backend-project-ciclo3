const express = require('express');
const routerApi = require('./routes')

const app = express();
const port = 3002;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
})

app.listen(port, () => {
  console.log('Mi port ' + port);
})