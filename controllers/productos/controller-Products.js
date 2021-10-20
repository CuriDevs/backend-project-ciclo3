import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';


const getAllProducts = async (callback) => {
    const conexionBd = getBD();
    await conexionBd.collection('Producto').find({}).toArray(callback)
};

const crearProducto = async (datosProducto, callback) => {
    if (
        Object.keys(datosProducto).includes('name') &&
        Object.keys(datosProducto).includes('value') &&
        Object.keys(datosProducto).includes('description') &&
        Object.keys(datosProducto).includes('status')&&
        Object.keys(datosProducto).includes('urlImg')&&
        Object.keys(datosProducto).includes('nombreImg')
    ) {
        const conexionBd = getBD();
        //implementar el codigo paa crar el producto en la BD
        
        await conexionBd.collection('Producto').insertOne(datosProducto, callback);
    } else {
        return 'error';
    }
};

const editarProducto = async ( id, edicion, callback) => {
    const filtrarProducto = { _id: new ObjectId(id) };
    const operacion = { 
        $set: edicion, 
    };
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