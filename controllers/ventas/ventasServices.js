import faker from 'faker';
import boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { getBD } from '../../BD/bd.js';

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

		const conexionBd = getBD();
		const datos = Object.values(data);
		const consulta = this.findOne(datos.shift());

		if (consulta) {
			await conexionBd.collection('ventas').insertOne(data);
		}
		throw boom.notFound('Ya se encuentra la venta');
	}

	async find() {
		const conexionBd = getBD();
		//implementar el codigo paa crar el producto en la BD
		const resultado = await conexionBd.collection('ventas').find({}).toArray();
		return resultado;
	}

	async findOne(id) {
		const conexionBd = getBD();
		//Obtenemos el id
		const filtrar_id = { _id: ObjectId(id) };

		//Consultamos y almacenamos el dato
		const resultado = await conexionBd.collection('ventas').findOne(filtrar_id);

		const objeto = Object.values(resultado); //convertimos el dato en un array con sus valores
		//const venta = this.ventas.find(item => item.id === id);

		if (objeto.findIndex(valor => valor.id === id)) { //verificamos si se encuentra repetido o no
			return resultado;
			//return ventas
		}
		throw boom.notFound('Venta no encontrada');
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
