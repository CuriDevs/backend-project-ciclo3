import faker from 'faker';
import boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';

class ventasServices {
	constructor() {
		//this.ventas = [];
		//this.generate();
	}

	// generate() {
	// 	const limit = 3;
	// 	for (let index = 0; index < limit; index++) {
	// 		this.ventas.push({
	// 			_id: faker.datatype.uuid(),
	// 			idProduct: faker.datatype.uuid(),
	// 			vTotal: parseInt(faker.commerce.price(), 10),
	// 			amount: parseInt(faker.commerce.price(), 10),
	// 			price: parseInt(faker.commerce.price(), 10),
	// 			dateV: faker.date.recent(),
	// 			idClient: faker.datatype.uuid(),
	// 			nameC: faker.name.findName(),
	// 			nameV: faker.name.findName(),
	// 		});
	// 	}
	// }

	async create(data) {
		const connection = getBD();
		const object = {
			idProduct: ObjectId(data.idProduct),
			vTotal: data.vTotal,
			amount: data.amount,
			price: data.price,
			dateV: data.dateV,
			state: data.state,
			idVendedor: ObjectId(data.idVendedor),
			nameC: data.nameC,
			Documento: data.Documento,
		}
		/*
		const id = {id: data.idSales};
		//Validacion de regitro en proceso...
		const res = await connection.collection('ventas').findOne(id);
		if(res !== null){
			console.log('el id ya se encuentra registrado');
		} */
		await connection.collection("ventas").insertOne(object);
	}

	async find() {
		const conexionBd = getBD();
		//implementar el codigo paa crar el producto en la BD
		const resultado = await conexionBd.collection('ventas').find({}).toArray();
		if (resultado.length === 0) {
			throw boom.notFound('No se encuentran ventas');
		}
		return resultado;
	}

	async findOne(_idVenta) {
		const connection = getBD(); //conexion a la db

		const id = {_id: ObjectId(_idVenta)};
		const res = await connection.collection('ventas').findOne(id);
		if(res === null){
			throw boom.notFound('Venta no encontrada');
		}
		return res;
	}

	async update(id, changes) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const venta = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
		if (venta.length === 0) {
			throw boom.notFound('Venta no encontrada');
		} else {
			const operacion = { $set: changes, };
			const updated = await conexionBd.collection('ventas').updateOne(filtrarProducto, operacion, { upsert: false, returnOriginal: true });
			const resultado = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
			return resultado;
		}
	}

	async delete(id) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const venta = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
		if (venta.length === 0) {
			throw boom.notFound('Venta no encontrada');
		} else {
			const remove = await conexionBd.collection('ventas').deleteOne(filtrarProducto);
			return { id };
		}
	}
}

export default ventasServices;
