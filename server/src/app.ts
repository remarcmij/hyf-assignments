import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.normalize(path.join(__dirname, '../../client/dist'));

// Serve the client
// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.normalize(frontendPath)));
// Redirect * requests to give the client data
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

export default app;
