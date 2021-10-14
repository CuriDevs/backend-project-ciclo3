//forma de importar express tradicionalmente
//const express = requier ('express')
// importacion con el type=module puesto en package.json se importa igual que en fontend
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import {conectarBD} from './BD/bd.js';
import rutasProducto from './views/productos/rutas.js';
//import rutasUsuario from './views/usuarios/rutas.js';
//import rutasVentas from './views/ventas/rutas.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json ());
app.use(Cors());
app.use('/productos',rutasProducto);
//app.use(rutasUsuario);
//app.use(rutasVentas);

const main = () => {
        return app.listen(process.env.PORT, () => { 
        console.log(`Escuchando puerto ${process.env.PORT}`);
    }); 
};



conectarBD(main);
