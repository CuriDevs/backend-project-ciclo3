import boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';

class usersServices {
	constructor() { }

	async create(data) {
		const connection = getBD();
		const object = {
			UserName: data.UserName,
			Email: data.Email,
			UrlImage: data.UrlImage,
			Rol: data.Rol,
			State: data.State,
			Document: data.Document,
			date: data.date,
		};
		await connection.collection("Usuarios").insertOne(object);
	}

	async find() {
		const conexionBd = getBD();
		const resultado = await conexionBd.collection('Usuarios').find({}).toArray();
		if (resultado.length === 0) {
			throw boom.notFound('No se encuentran Usuarios');
		}
		return resultado;
	}

	async findOne(_idUsuario) {
		const connection = getBD(); //conexion a la db
		const id = { _id: ObjectId(_idUsuario) };
		const res = await connection.collection('Usuarios').findOne(id);
		if (res === null) {
			throw boom.notFound('Usuario no encontrado');
		}
		return res;
	}

	async update(id, changes) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const Usuario = await conexionBd.collection('Usuarios').find(filtrarProducto).toArray();
		if (Usuario.length === 0) {
			throw boom.notFound('Usuario no encontrado');
		} else {
			const operacion = { $set: changes, };
			const updated = await conexionBd.collection('Usuarios').updateOne(filtrarProducto, operacion, { upsert: false, returnOriginal: true });
			const resultado = await conexionBd.collection('Usuarios').find(filtrarProducto).toArray();
			return resultado;
		}
	}

	async delete(id) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const Usuario = await conexionBd.collection('Usuarios').find(filtrarProducto).toArray();
		if (Usuario.length === 0) {
			throw boom.notFound('Usuario no encontrado');
		} else {
			const remove = await conexionBd.collection('Usuarios').deleteOne(filtrarProducto);
			return { id };
		}
	}
}

export default usersServices;
