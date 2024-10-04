import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configurar Sequelize usando las variables de entorno, con valores por defecto si alguna está indefinida
const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'default_db_name',        // Nombre de la base de datos
  process.env.DB_USER ?? 'default_user',           // Usuario
  process.env.DB_PASSWORD ?? 'default_password',   // Contraseña
  {
    host: process.env.DB_HOST ?? 'localhost',       // Host (servidor)
    dialect: 'mysql',     // Dialecto de la base de datos (MySQL, en este caso)
  }
);

export default sequelize;
