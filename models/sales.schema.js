import joi from 'joi';

const id = joi.string().hex();
const idSales = joi.string().alphanum().min(4).max(15);
const idProduct = joi.string().hex();
const vTotal = joi.number().min(999).max(99999999);
const amount = joi.number().min(1);
const price = joi.number().min(999).max(99999999);
const dateV = joi.date().iso();
const state = joi.string().min(3).max(11);
const idClient = joi.string().hex();
const nameC = joi.string().min(3).max(50);
const nameV = joi.string().min(3).max(50);

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
