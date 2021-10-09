//forma de importar express tradicionalmente
//const express = requier ('express')
// importacion con el type=module puesto en package.json se importa igual que en fontend
import Express from 'express';

const app = Express();

app.get('/products', (req, res) => {
    console.log('lista de productos');

    res.send(Products);
})

app.post('/products', (req,res) => {})

app.listen(5000, () => { 
    console.log('escuchando puerto 5000');
});
