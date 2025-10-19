import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import actorsRouter from './routes/actors.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/actors', actorsRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = Number(err.status) || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
