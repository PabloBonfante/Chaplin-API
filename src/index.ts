import express from 'express';
import chaplin from './routes/chaplinRouters';
import sequelize from './config/database';

const app = express();
app.use(express.json());

const PORT = 3000;

sequelize
	.sync()
	.then(() => {
		console.log('Database synced');
	})
	.catch((err: Error) => {
		console.error('Error syncing database:', err);
	});

app.get('/ping', (_req, res) => {
	console.log('someone ponged here!!' + new Date().toLocaleDateString());
	res.send('pong ' + new Date().toLocaleDateString());
});

// Ruta para probar conexión a la base de datos
app.get('/test-db', (_req, res) => {
	sequelize.authenticate()
		.then(() => {
			console.log('Database connection has been established successfully.');
			res.status(200).send('Database connection successful!');
		})
		.catch((error: Error) => {
			console.error('Unable to connect to the database:', error);
			res.status(500).send('Failed to connect to the database.');
		});
});

app.use('/api', chaplin);
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
