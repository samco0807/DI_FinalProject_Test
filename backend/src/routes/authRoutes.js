// backend/src/routes/authRoutes.ts
const express = require('express');
const { register, login } =require( '../controllers/authController.js')

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

export default router;
