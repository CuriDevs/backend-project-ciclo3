const { Router } = require("express");
const express = require("express");
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const ventas = [];
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    ventas.push([{
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    }]);
  }
  res.json(ventas);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'Not found'
    })
  } else {
    res.json(
      {
        id,
        name: "Producto 1",
        price: 1000
      });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Update',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Delete',
    id
  });
});

module.exports = router;