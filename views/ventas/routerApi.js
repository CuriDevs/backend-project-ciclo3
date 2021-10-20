import express from 'express';
import ventasRouter from './ventasRouter.js';

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/ventas', ventasRouter);
}

export default routerApi;
