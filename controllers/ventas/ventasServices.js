import faker from 'faker';
import boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';
import { ObjectID } from 'bson';

class ventasServices {
	constructor() {
		this.ventas = [];
		this.generate();
	}

	generate() {
		const limit = 3;
		for (let index = 0; index < limit; index++) {
			this.ventas.push({
				_id: faker.datatype.uuid(),
				idProduct: faker.datatype.uuid(),
				vTotal: parseInt(faker.commerce.price(), 10),
				amount: parseInt(faker.commerce.price(), 10),
				price: parseInt(faker.commerce.price(), 10),
				dateV: faker.date.recent(),
				idClient: faker.datatype.uuid(),
				nameC: faker.name.findName(),
				nameV: faker.name.findName(),
			});
		}
	}

	async create(data) {
		const connection = getBD();
		//const _id = data["_id"];
		const schema = new Object(data);
	
		if(schema.hasOwnProperty("_id")){
			const id = ObjectId(schema["_id"]);

			if(connection.collection('ventas').find(id)){
				console.log("ya se encuentra un dato")
			}
			return connection.collection("ventas").insertOne(data);
		}; 
	}

	async find() {
		const conexionBd = getBD();
        //implementar el codigo paa crar el producto en la BD
    const resultado = await conexionBd.collection('ventas').find({}).toArray()
		if(resultado.length === 0){
			throw boom.notFound('Venta no encontrada');
		}
		return resultado;
	}

	async findOne(_id) {
		const connection = getBD(); //conexion a la db

		if(typeof _id !== 'object'){ //comparamos si es diferente a un objeto
			_id = ObjectID(_id); //convertimos y enviamos
			return await connection.collection('ventas').findOne({_id});
		}

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
