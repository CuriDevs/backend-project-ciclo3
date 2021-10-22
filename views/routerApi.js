import express from 'express';
import ventasRouter from './ventas/ventasRouter.js';
import usersRouter from './usuarios/usersRouter.js';

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/ventas', ventasRouter);
	router.use('/Users', usersRouter)
}

export default routerApi;
