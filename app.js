const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const routerApi = require('./routes');

const app = express();
const port = 3003;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:passEdgar12345$@cluster0.qp4qz.mongodb.net/db-project-ciclo-3?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Estamos conectados");
  });

app.get('/', (req, res) => {
  res.send('Hola Mundo');
})

app.listen(port, () => {
  console.log('Mi port ' + port);
})

//routerApi(app);