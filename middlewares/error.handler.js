export const logErrors = (err, req, res, next) => {
	console.log(err);
	next(err);
}

export function errorHandler(err, req, res, next) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

export function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		res.status(output.statusCode).json(output.payload);
	}
	next(err);
}

export default { logErrors, errorHandler, boomErrorHandler };
