import { getBD } from '../../BD/bd.js';
import { ObjectId } from 'mongodb';


const getAllProducts = async(callback) => {
    const conexionBd = getBD();
    await conexionBd.collection('Producto').find({}).limit().toArray(callback)  
    };
 const crearProducto = async(datosProductpo, callback) =>{
     if (
         Object.keys(datosProductpo).includes('name') &&
         Object.keys(datosProductpo).includes('value') &&
         Object.keys(datosProductpo).includes('description') &&
         Object.keys(datosProductpo).includes('status') 
     ) {
         const conexionBd = getBD();
         //implementar el codigo paa crar el producto en la BD
         await conexionBd.collection('producto').insertOne(datosProductpo, callback);
     }  else {
         return 'error';
     }
};

const editarProducto = async(edicion, id, callback) => {
    const filtrarProducto = {_id: new ObjectId(id)};
    delete edicion.id;
    const operacion = {$set: edicion,};
    const conexionBd = getBD();
    await conexionBd.collection('producto').findOneAndUpdate(filtrarProducto, operacion,
        {upsert: true,returnOriginal: true}, callback);

};

const eliminarProducto = async(id, callback) => {
    const filtrarProducto = {_id: new ObjectId(id)};
    const conexionBd = getBD();
    await conexionBd.collection('producto').deleteOne(filtrarProducto, callback);
};

export {getAllProducts,crearProducto,editarProducto,eliminarProducto};