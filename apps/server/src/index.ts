import express from 'express';
import routes from './routes/index.js';
const app = express();

app.use(routes);

app.get('/', (req, res) => res.send('Server is running'));
app.listen(3001, () => console.log('Server listening on port 3001'));