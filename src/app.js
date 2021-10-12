const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routerApi = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
})

app.listen(port, () => {
  console.log('Mi port ' + port);
})

routerApi(app)