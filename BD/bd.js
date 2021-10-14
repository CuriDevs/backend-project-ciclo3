import {Db, MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringconexion = process.env.DATABASE_URL_PRUEBA;

const Client = new MongoClient (stringconexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexionBd;

const conectarBD = (callback) =>{  
    
    Client.connect((err, db) => {
        if (err) {
            console.error('Error conectando a la base de datos');
            return 'error';
        }
        conexionBd = db.db('cellphone');
        console.log('Conexion Exitosa');
        return callback();
    });
};

const getBD =() => {
    return conexionBd;
};

export {conectarBD, getBD};
