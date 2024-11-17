// backend/src/controllers/userController.ts
import { Request, Response } from "express";
import {
  _getAllUsers,
  _getUserById,
  _getUserByEmail,
  _getUserByName,
  _createUser,
  _updateUser,
  _deleteUser,
} from "../models/userModel";
import bcrypt from "bcrypt";
import { User } from "../models/User";
require("dotenv").config();

// Function to get all the users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await _getAllUsers();
    res.json(
      users.map((user) => ({
        ...user,
        password: undefined,
      }))
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// Function for user logout
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

// Function to find user by email
export const getUserByMail = async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  try {
    const user = await _getUserByEmail(userEmail!);
    if (!user) {
      return res.status(404).json({ message: "User with email not found." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching user profile by mail." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await _getUserById(userId!);
    if (!user) {
      return res.status(404).json({ message: "User with email not found." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching user profile by mail." });
  }
};

// Function to find user by name
export const getUserByName = async (req: Request, res: Response) => {
  const userName = req.user?.name;
  try {
    const user = await _getUserByName(userName!);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
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

// Function to create new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "You must complete the informations" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await _createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating new user." });
  }
};

// Function to update user
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Make sure `req.user` contains the user ID
  const userData = req.body; // bRetrieve updated data from req.body

  // Check that the user ID is present
  if (!userId) {
    return res.status(400).json({ message: "User ID is required for update." });
  }

  // Check if userData contains data before calling the function
  if (!userData || Object.keys(userData).length === 0) {
    return res.status(400).json({ message: "No update data provided." });
  }

  try {
    const updatedUser = await _updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// Function to delete user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  // Check that the user ID is present
  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is required for deletion." });
  }
  try {
    await _deleteUser(userId!);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting user." });
  }
};
