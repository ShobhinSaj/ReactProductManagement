import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

const router = express.Router();

const users: { username: string; firstName: string; password: string }[] = [];

router.post('/signup', (req, res) => {
  const { username, password, firstName } = req.body;
  
  // Check if the username already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  // Hash the password and create the new user
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword, firstName });
  res.status(201).send('User created');
});


router.post('/login', (req, res) => {
  const { username, password,firstName } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    res.json({ token, firstName: user.firstName });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

export default router;
