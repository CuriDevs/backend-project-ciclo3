import faker from 'faker';
import boom from '@hapi/boom';
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

		const newProducto = {
			id: faker.datatype.uuid(),
			...data
		};
		this.ventas.push(newProducto);
		return newProducto;
	}

	async find() {
		return this.ventas;
	}

	async findOne(id) {
		const venta = this.ventas.find(item => item.id === id);
		if (!venta) {
			throw boom.notFound( 'Venta no encontrada' );
		}
		return venta;
	}

	async update(id, changes) {
		const index = this.ventas.findIndex(item => item.id === id);
		if (index === -1) {
			throw boom.notFound( 'Venta no encontrada' );
		}
		const producto = this.ventas[index];
		this.ventas[index] = {
			...producto,
			...changes
		};
		return this.ventas[index];
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
