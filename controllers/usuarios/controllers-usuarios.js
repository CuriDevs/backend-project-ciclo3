import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';

const getAllUsers = async(callback) => {
    const conexionBd = getBD();
	console.log('query');
    await conexionBd.collection('usuario').find().limit(50).toArray(callback);
    };

const crearUsuario= async (datosUsuario, callback) => {
        const conexionBd = getBD();
        //implementar el codigo paa crar el producto en la BD
        await conexionBd.collection('usuario').insertOne(datosUsuario, callback);
    };

	const consultarUsuario = async (id, callback) => {
		const baseDeDatos = getDB();
		await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
	  };

	  const consultarOCrearUsuario = async (req, callback) => {
		console.log('Estoy llegando a crear usuario');
		// 6.1. obtener los datos del usuario desde el token
		const token = req.headers.authorization.split('Bearer ')[1];
		const user = jwt_decode(token)['http://localhost/userData'];
		console.log(user);

		// 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
		const baseDeDatos = getDB();
		await baseDeDatos.collection('usuario').findOne({ email: user.email }, async (err, response) => {
		  console.log('response consulta bd', response);
		  if (response) {
			// 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
			callback(err, response);
		  } else {
			// 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
			user.auth0ID = user._id;
			delete user._id;
			user.rol = 'sin rol';
			user.estado = 'pendiente';
			await crearUsuario(user, (err, respuesta) => callback(err, user));
		  }
		});
	  };

const editarUsuario = async ( id, edicion, callback) => {
    const filtrarUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const conexionBd = getBD();
    await conexionBd.collection('usuario').findOneAndUpdate(filtrarUsuario, operacion,
        {upsert: true,returnOriginal: true}, callback);
};

const eliminarUsuario = async (id, callback) => {
    const filtrarUsuario = { _id: new ObjectId(id) };
    const conexionBd = getBD();
    await conexionBd.collection('usuario').deleteOne(filtrarUsuario, callback);
};


export { getAllUsers, consultarUsuario, consultarOCrearUsuario,  editarUsuario, crearUsuario, eliminarUsuario};
