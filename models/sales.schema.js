import joi from 'joi';

const id = joi.string().hex();
const idProduct = joi.string().hex();
const vTotal = joi.number().min(999).max(99999999);
const amount = joi.number().min(1);
const price = joi.number().min(999).max(99999999);
const dateV = joi.date().iso();
const state = joi.string().min(3).max(11);
const idVendedor = joi.string().hex();
const nameC = joi.string().min(3).max(50);
const Documento = joi.number().min(1).max(9999999999);

export const createVentasSchema = joi.object({
	idProduct: idProduct.required(),
	vTotal: vTotal.required(),
	amount: amount.required(),
	price: price.required(),
	dateV: dateV.required(),
	state: state.required(),
	idVendedor: idVendedor.required(),
	nameC: nameC.required(),
	Documento: Documento.required()
});

export const updateVentasSchema = joi.object({
	idProduct: idProduct,
	vTotal: vTotal,
	amount: amount,
	price: price,
	dateV: dateV,
	state: state,
	idVendedor: idVendedor,
	nameC: nameC,
	Documento: Documento
});

export const getVentasSchema = joi.object({
	id: id.required()
});

export default { createVentasSchema, updateVentasSchema, getVentasSchema };
