import joi from 'joi';

const _id = joi.string().uuid();
const idProduct = joi.string().uuid();
const vTotal = joi.number().min(3).max(15);
const amount = joi.number().min(3).max(15);
const price = joi.number().min(3).max(15);
const dateV = joi.date();
const idClient = joi.string().uuid();
const nameC = joi.string().min(3).max(15);
const nameV = joi.string().min(3).max(15);

export const createCategoriasSchema = joi.object({
	idProduct: idProduct.required(),
	vTotal: vTotal.required(),
	amount: amount.required(),
	price: price.required(),
	dateV: dateV.required(),
	idClient: idClient.required(),
	nameC: nameC.required(),
	nameV: nameV.required()
});

export const updateCategoriasSchema = joi.object({
	idProduct: idProduct,
	vTotal: vTotal,
	amount: amount,
	price: price,
	dateV: dateV,
	idClient: idClient,
	nameC: nameC,
	nameV: nameV
});

export const getCategoriasSchema = joi.object({
	_id: _id.required()
});

export default { createCategoriasSchema, updateCategoriasSchema, getCategoriasSchema };
