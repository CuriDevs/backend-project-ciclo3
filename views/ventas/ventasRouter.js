const { Router, json } = require("express");
const express = require("express");
const ventasServices = require('../../controllers/ventas/ventasServices');

const router = express.Router();
const service = new ventasServices();

router.get('/', async (req, res) => {
	const ventas = await service.find();
	res.status(200).json(ventas);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const ventas = await service.findOne(id);
	res.json(ventas);
}
);

router.post('/', async (req, res) => {
	const body = req.body;
	const newVentas = await service.create(body);
	res.status(201).json(newVentas);
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const ventas = await service.update(id, body);
		res.json(ventas);
	} catch (error) {
		res.status(404),json({
			message: error.message
		})
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		res.status(404),json({
			message: error.message
	})
	}
});

module.exports = router;
