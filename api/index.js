import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose.connect(
  process.env.MONGO
).then(() => {
    console.log('Mongodb is connected');
})
const app = express();
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})