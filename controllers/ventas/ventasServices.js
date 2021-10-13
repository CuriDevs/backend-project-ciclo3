import faker from 'faker';

class ventasServices {
	constructor() {
		this.ventas = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.ventas.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
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
		return this.ventas.find(item => item.id === id);
	}

	async update(id, changes) {
		const index = this.ventas.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Producto no encontrado');
		}
		const producto = this.ventas[index];
		this.ventas[index] = {
			...producto,
			...changes
		}
		return this.ventas[index];
	}

	async delete(id) {
		const index = this.ventas.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Producto no encontrado');
		}
		this.ventas.splice(index, 1);
		return { id };
	}
}

export default ventasServices;
