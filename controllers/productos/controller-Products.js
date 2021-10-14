import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';


const getAllProducts = async (callback) => {
    const conexionBd = getBD();
<<<<<<< HEAD
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
=======
    await conexionBd.collection('Producto').find({}).toArray(callback)
};

const crearProducto = async (datosProducto, callback) => {
    if (
        Object.keys(datosProducto).includes('name') &&
        Object.keys(datosProducto).includes('value') &&
        Object.keys(datosProducto).includes('description') &&
        Object.keys(datosProducto).includes('status')
    ) {
        const conexionBd = getBD();
        //implementar el codigo paa crar el producto en la BD
        await conexionBd.collection('Producto').insertOne(datosProducto, callback);
    } else {
        return 'error';
    }
>>>>>>> 6ee56519e104003f859b14545494e8ee7f15980e
};

const editarProducto = async ( id, edicion, callback) => {
    const filtrarProducto = { _id: new ObjectId(id) };
    const operacion = { $set: edicion, };
    const conexionBd = getBD();
    await conexionBd.collection('Producto').findOneAndUpdate(filtrarProducto, operacion,
        { upsert: true, returnOriginal: true }, callback);

};

const eliminarProducto = async (id, callback) => {
    const filtrarProducto = { _id: new ObjectId(id) };
    const conexionBd = getBD();
    await conexionBd.collection('Producto').deleteOne(filtrarProducto, callback);
};

export { getAllProducts, crearProducto, editarProducto, eliminarProducto };