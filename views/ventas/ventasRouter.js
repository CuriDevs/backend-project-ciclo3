import express from 'express';
import ventasServices from '../../controllers/ventas/ventasServices.js';
import validatorHandler from '../../middlewares/validator.handler.js';
import { createVentasSchema, updateVentasSchema, getVentasSchema } from '../../models/sales.schema.js';

const ventasRouter = express.Router();
const service = new ventasServices();

ventasRouter.get('/',
	async (req, res) => {
		const doc = await service.find();
		res.status(200).json(doc);
	});

ventasRouter.get('/:id',
	validatorHandler(getVentasSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const ventas = await service.findOne(id);
			res.status(200).json(ventas);
		} catch (error) {
			next(error);
		}
	});

ventasRouter.post('/',
	validatorHandler(createVentasSchema, 'body'),
	async (req, res, next) => {
		try {
			const data = req.body;
			const newVentas = await service.create(data);
			res.status(201).json(newVentas);
		} catch (error) {
			next(error);
		}
});

ventasRouter.patch('/:id',
	validatorHandler(getVentasSchema, 'params'),
	validatorHandler(updateVentasSchema, 'body'),
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
	validatorHandler(getVentasSchema, 'params'),
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
