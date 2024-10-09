// backend/src/models/userModel.ts
import knex from "../db/knexfile";
import { User } from "./User";

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  return knex<User>("users").where({ email }).first();
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return knex<User>("users").where({ id }).first();
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const [newUser] = await knex<User>("users").insert(user).returning("*");
  return newUser;
};

// Add another function if needed
