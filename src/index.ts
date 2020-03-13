import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

export default serverless(app);
