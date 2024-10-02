import express from 'express';
import logger from 'morgan';
import path from 'path';
import router from './routes/routes';


const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router)

export default app;