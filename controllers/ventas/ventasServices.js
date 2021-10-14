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
        await conexionBd.collection('ventas').insertOne(data);
/*
		const newProducto = {
			id: faker.datatype.uuid(),
			...data
		};
		this.ventas.push(newProducto);
		*/
		return data;
	}

	async find() {
		const conexionBd = getBD();
        //implementar el codigo paa crar el producto en la BD
        const resultado = await conexionBd.collection('ventas').find({}).toArray()
		return resultado;
	}

	async findOne(id) {
		const venta = this.ventas.find(item => item.id === id);
		if (!venta) {
			throw boom.notFound( 'Venta no encontrada' );
		}
		return venta;
	}

	async update(_id, changes) {
		const filtrarProducto = { _id: ObjectId(_id) };
		if (!filtrarProducto) {
			throw boom.notFound( 'Venta no encontrada' );
		}
		const operacion = { $set: changes, };
    	const conexionBd = getBD();
    	const resultado = await conexionBd.collection('ventas').updateOne(filtrarProducto, operacion,
        { upsert: false, returnOriginal: true });
		return resultado;
}

	async delete(id) {
		const index = this.ventas.findIndex(item => item.id === id);
		if (index === -1) {
			throw boom.notFound( 'Venta no encontrada' );
		}
		this.ventas.splice(index, 1);
		return { id };
	}
}

export default ventasServices;
