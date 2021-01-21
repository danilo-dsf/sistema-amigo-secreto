import 'reflect-metadata';
import express from 'express';

import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333, () => {
  console.log('✅ Server started at port 3333');
});

export default app;