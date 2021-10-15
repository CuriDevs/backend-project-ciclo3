import joi from 'joi';

const id = joi.string().hex();
const idSales = joi.string().alphanum().min(5).max(15);
const idProduct = joi.string().hex();
const vTotal = joi.number().min(3).max(5000);
const amount = joi.number().min(3).max(100);
const price = joi.number().min(3).max(5000);
const dateV = joi.date();
const state = joi.string().min(3).max(11);
const idClient = joi.string().hex();
const nameC = joi.string().min(3).max(15);
const nameV = joi.string().min(3).max(15);

export const createVentasSchema = joi.object({
	idSales: idSales.required(),
	idProduct: idProduct.required(),
	vTotal: vTotal.required(),
	amount: amount.required(),
	price: price.required(),
	dateV: dateV.required(),
	state: state.required(),
	idClient: idClient.required(),
	nameC: nameC.required(),
	nameV: nameV.required()
});

export const updateVentasSchema = joi.object({
	idSales: idSales,
	idProduct: idProduct,
	vTotal: vTotal,
	amount: amount,
	price: price,
	dateV: dateV,
	state: state,
	idClient: idClient,
	nameC: nameC,
	nameV: nameV
});

export const getVentasSchema = joi.object({
	id: id.required()
});

export default { createVentasSchema, updateVentasSchema, getVentasSchema };
