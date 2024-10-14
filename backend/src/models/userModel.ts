// backend/src/models/userModel.ts
import db from "../db/knex";
import { User } from "./User.ts";

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  return db<User>("users").where({ email }).first();
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return db<User>("users").where({ id }).first();
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const [newUser] = await db<User>("users").insert(user).returning("*");
  return newUser;
};

// Add another function if needed
