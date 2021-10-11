import Express from 'express'
import {
    crearProducto,
    eliminarProducto,
    editarProducto,
    getAllProducts,
  } from '../../controllers/productos/controller-Products.js';

const rutasProducto = Express.Router();

const generalCallback = (res) => {(err, result) => {
    if (err) {
        res.status(500).send('Error consultando productos'); 
    } else {
        res.json(result);
    }
}};

rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien consulta lista de productos'); 
    getAllProducts(generalCallback(res));
});

rutasProducto.route('/productos').post((req,res) => {
    crearProducto(req.body, generalCallback(res));
});

rutasProducto.route('/productos/:id').path((req, res) => {
    editarProducto(req.params.id, req.body, generalCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, generalCallback(res));
});


export default rutasProducto;