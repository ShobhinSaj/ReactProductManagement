import express from 'express';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  userId: string; // Add userId to associate products with users
}

const products: Product[] = [];

router.get('/', authMiddleware, (req, res) => {
  const userId = (req as any).user.username; // Assuming username is unique
  const userProducts = products.filter(product => product.userId === userId);
  res.json(userProducts);
});

router.post('/', authMiddleware, (req, res) => {
  const { name, price, description } = req.body;
  const userId = (req as any).user.username; // Assuming username is unique
  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
    description,
    userId,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const productId = +req.params.id;
  const userId = (req as any).user.username; // Assuming username is unique
  const productIndex = products.findIndex(p => p.id === productId && p.userId === userId);
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

export default router;