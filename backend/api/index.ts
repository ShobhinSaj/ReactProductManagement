import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../src/routes/auth';
import productRoutes from '../src/routes/products';
import path from 'path';
const app = express();
// app.use(cors());
const corsOptions = {
  origin: '*',
  credentials: true, // Allow credentials such as cookies and authorization headers
  optionSuccessStatus: 200,
};

// Use CORS middleware before routes
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static('build'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.get('/ok', (req, res) => {
  res.send('Hello from Express!');
});
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../build/index.html`);
});