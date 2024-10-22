// backend/src/models/userModel.ts
import db from "../db/knex";
import { User } from "./User";

// Function to get all users
export const _getAllUsers = async (): Promise<User[]> => {
  return db<User>("users").select("*");
};

// Function to get user by mail
export const _getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  try {
    return db<User>("users").where({ email }).first();
  } catch (error) {}
};

// Function to get user by id
export const _getUserById = async (
  id: number
): Promise<User | undefined> => {
  try {
    return db<User>("users").where({ id }).first();
  } catch (error) {}
};

// Function to get user by name
export const _getUserByName = async (
  name: string
): Promise<User | undefined> => {
  return db<User>("users").where({ name }).first();
};

// Function to create new user
export const _createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const [newUser] = await db<User>("users").insert(userData).returning("*");
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};

// Function to update user profile
export const _updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  try {
    const [updateUser] = await db<User>("users")
      .where({ id })
      .update(userData)
      .returning("*");
    return updateUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("User update failed");
  }
};

// Function to delete user
export const _deleteUser = async (id: number): Promise<User> => {
  try {
    const [deletedUser] = await db<User>("users")
      .where({ id })
      .del()
      .returning("*");
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("User deleting failed");
  }
};
