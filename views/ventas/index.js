const express = require('express');
const ventasRouter = require('./ventasRouter');

function ventasRouter(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/ventas', ventasRouter);
}

module.exports = ventasRouter;
