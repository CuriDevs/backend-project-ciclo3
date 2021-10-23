import joi from 'joi';

const id = joi.string().hex();
const UserName = joi.string().min(1).max(100);
const Email = joi.string().email();
const UrlImage = joi.string().uri();
const Rol = joi.string().min(5).max(15);
const State = joi.string().min(3).max(15);
const date = joi.date();

export const createUsersSchema = joi.object({
	UserName: UserName.required(),
	Email: Email.required(),
	UrlImage: UrlImage.required(),
	Rol: Rol,
	State: State.required(),
	date: date.required(),
});

export const updateUsersSchema = joi.object({
	UserName: UserName,
	Email: Email,
	UrlImage: UrlImage,
	Rol: Rol,
	State: State,
	date: date,
});

export const getUsersSchema = joi.object({
	id: id.required()
});

export default { createUsersSchema, updateUsersSchema, getUsersSchema };
