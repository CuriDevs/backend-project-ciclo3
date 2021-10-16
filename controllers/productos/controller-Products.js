import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';

const getAllProducts = async(callback) => {
    const conexionBd = getBD();
    await conexionBd.collection('producto').find().limit().toArray(callback);
    };

 const crearProducto = async(datosProducto, callback) => {
     const conexionBd = getBD();
     console.log('llaves: ', Object.keys(datosProducto));
     if (
         Object.keys(datosProducto).includes('name') &&
         Object.keys(datosProducto).includes('value') &&
         Object.keys(datosProducto).includes('description') &&
         Object.keys(datosProducto).includes('status')
     ) {

         await conexionBd.collection('producto').insertOne(datosProducto, callback);
     }  else {
         return {err: 'condiciones no encontradas', result:''};
     }

};

const editarProducto = async(edicion, id, callback) => {
    const filtrarProducto = {_id: new ObjectId(id)};

    const operacion = {$set: edicion,};
    const conexionBd = getBD();
    await conexionBd.collection('producto').findOneAndUpdate(filtrarProducto, operacion,
        {upsert: true,returnOriginal: true}, callback);
};

const eliminarProducto = async (id, callback) => {
    const filtrarProducto = { _id: new ObjectId(id) };
    const conexionBd = getBD();
    await conexionBd.collection('Producto').deleteOne(filtrarProducto, callback);
};




export { getAllProducts, editarProducto, crearProducto, eliminarProducto};
