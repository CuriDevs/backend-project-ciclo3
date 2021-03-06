//forma de importar express tradicionalmente
//const express = requier ('express')
// importacion con el type=module puesto en package.json se importa igual que en fontend
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './BD/bd.js';
import rutasProducto from './views/productos/rutas.js';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler.js';
import routerApi from './views/routerApi.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

app.use(rutasProducto);

const main = () => {
	return app.listen(process.env.PORT, () => {
		console.log(`Escuchando puerto ${process.env.PORT}`);
	});
};

app.get('/', (req, res) => {
	res.send('Hola Mundo');
});


conectarBD(main);
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
