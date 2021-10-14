import express from 'express';
import ventasServices from '../../controllers/ventas/ventasServices.js';
import validatorHandler from '../../middlewares/validator.handler.js';
import { createCategoriasSchema, updateCategoriasSchema, getCategoriasSchema } from '../../models/sales.schema.js';

const ventasRouter = express.Router();
const service = new ventasServices();

ventasRouter.get('/', async (req, res) => {
	const ventas = await service.find();
	res.status(200).json(ventas);
});

ventasRouter.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const ventas = await service.findOne(id);
		res.json(ventas);
	} catch (error) {
		next(error);
	}
});

ventasRouter.post('/', async (req, res, next) => {
	try {
		const body = req.body;
		const newVentas = await service.create(body);
		res.status(201).json(newVentas);
	} catch (error) {
		next(error);
	}
});

ventasRouter.patch('/:id',
	validatorHandler(getCategoriasSchema, 'params'),
	validatorHandler(updateCategoriasSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const ventas = await service.update(id, body);
			res.json(ventas);
		} catch (error) {
			next(error);
		}
	});

ventasRouter.delete('/:id',
	validatorHandler(getCategoriasSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const rta = await service.delete(id);
			res.status(410).json(rta);
		} catch (error) {
			next(error);
		}
	});

export default ventasRouter;
