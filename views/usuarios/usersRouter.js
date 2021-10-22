import express from 'express';
import usersServices from '../../controllers/usuarios/usersServices.js';
import validatorHandler from '../../middlewares/validator.handler.js';
import {createUsersSchema, updateUsersSchema, getUsersSchema } from '../../models/users.schema.js';

const usersRouter = express.Router();
const service = new usersServices();

usersRouter.get('/',
	async (req, res, next) => {
		try {
			const doc = await service.find();
			res.status(200).json(doc);
		} catch (error) {
			next(error);
		}
	});

usersRouter.get('/:id',
	validatorHandler(getUsersSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const Users = await service.findOne(id);
			res.status(200).json(Users);
		} catch (error) {
			next(error);
		}
	});

usersRouter.post('/',
	validatorHandler(createUsersSchema, 'body'),
	async (req, res, next) => {
		try {
			const data = req.body;
			const newUsers = await service.create(data);
			res.status(201).json(newUsers);
		} catch (error) {
			next(error);
		}
});

usersRouter.patch('/:id',
	validatorHandler(getUsersSchema, 'params'),
	validatorHandler(updateUsersSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const Users = await service.update(id, body);
			res.json(Users);
		} catch (error) {
			next(error);
		}
	});

usersRouter.delete('/:id',
	validatorHandler(getUsersSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const rta = await service.delete(id);
			res.status(410).json(rta);
		} catch (error) {
			next(error);
		}
	});

export default usersRouter;
