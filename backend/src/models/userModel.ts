// backend/src/models/userModel.ts
import db from "../db/knex";
import { User } from "./User";

// Function to get user by mail
export const _getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  return db<User>("users").where({ email }).first();
};

// Function to get user by name
export const _getUserByName = async (name: string): Promise<User | undefined> => {
  return db<User>("users").where({ name }).first();
};

// Function to create new user
export const _createUser = async (userData: Partial<User>): Promise<User> => {
  const [newUser] = await db<User>("users").insert(userData).returning("*");
  return newUser;
};

// Function to update user profile
export const _updateUser = async (userData: Partial<User>): Promise<User> => {
  const [updateUser] = await db<User>("users").update(userData).returning("*");
  return updateUser;
};

// Function to delete user
export const _deleteUser = async (id: number): Promise<User> => {
  const [deleteUser] = await db<User>("users").where({id}).del().returning("*");
  return deleteUser;
};