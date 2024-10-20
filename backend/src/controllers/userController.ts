// backend/src/controllers/userController.ts
import { Request, Response } from "express";
import {
  _getUserByEmail,
  _getUserByName,
  _createUser,
  _updateUser,
  _deleteUser,
} from "../models/userModel";

export const getUserByMail = async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  try {
    const user = await _getUserByEmail(userEmail!);
    
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching user profile by mail." });
  }
};

// GET /api/users/profile
export const getUserByName = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const user = await _getUserByName(userId!);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // exclude password from response
    const { ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching user profile by name." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await _createUser(userId!);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating new user." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await _updateUser(userId!);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating user." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await _deleteUser(userId!);
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting user." });
  }
};
