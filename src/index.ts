import express from 'express';
import chaplin from './routes/chaplin';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
	console.log('someone ponged here!!' + new Date().toLocaleDateString());
	res.send('pong' + new Date().toLocaleDateString());
});

app.use('/api', chaplin);
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
