import express from 'express';
import routes from './routes/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import passport from 'passport';


const app = express();
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use(routes);


app.get('/', (req, res) => res.send('Server is running'));
app.listen(3001, () => console.log('Server listening on port 3001'));