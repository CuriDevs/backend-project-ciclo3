import express from 'express';
import ventasServices from '../../controllers/ventas/ventasServices.js';

const ventasRouter = express.Router();
const service = new ventasServices();

ventasRouter.get('/', async (req, res) => {
	const ventas = await service.find();
	res.status(200).json(ventas);
});

ventasRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const ventas = await service.findOne(id);
	res.json(ventas);
}
);

ventasRouter.post('/', async (req, res) => {
	const body = req.body;
	const newVentas = await service.create(body);
	res.status(201).json(newVentas);
});

ventasRouter.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const ventas = await service.update(id, body);
		res.json(ventas);
	} catch (error) {
		res.status(404), json({
			message: error.message
		});
	}
});

ventasRouter.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(410).json(rta);
	} catch (error) {
		res.status(404).json({
			message: error.message
		});
	}
});

export default ventasRouter;
