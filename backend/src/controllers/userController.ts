// backend/src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUserById } from '../models/userModel';

// GET /api/users/profile
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const user = await getUserById(userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Exclure le mot de passe de la réponse
    const { password, ...userData } = user;

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user profile.' });
  }
};
