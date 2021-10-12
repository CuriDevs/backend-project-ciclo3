const express = require('express');
const salesRouter = require('./salesRouter');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/sales', salesRouter);
}

module.exports = routerApi;