// backend/src/controllers/userController.ts
import { Request, Response } from "express";
import {
  _getAllUsers,
  _getUserByEmail,
  _getUserByName,
  _createUser,
  _updateUser,
  _deleteUser,
} from "../models/userModel";
import bcrypt from "bcryptjs";
import { verify } from "crypto";

import { error } from "console";
require("dotenv").config();

export const registerUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    const existingUser = await _getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await _createUser({ email, password: hashPassword });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await _getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found....." });
    }
    const passwordMatch = await bcrypt.compare(password + "", user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error("Error", error);
    return res.status(401).json({ message: "Internal server error" });
  }
};

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
  const userId = req.user?.id;
  try {
    const user = await _createUser(userId!);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating new user." });
  }
};

// Function to update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await _updateUser({ id: userId, userData: ...req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// Function to delete user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await _deleteUser(userId!);
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting user." });
  }
};