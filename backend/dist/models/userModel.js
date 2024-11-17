"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteUser = exports._updateUser = exports._createUser = exports._getUserByName = exports._getUserById = exports._getUserByEmail = exports._getAllUsers = void 0;
// backend/src/models/userModel.ts
const knex_1 = require("../db/knex");
// Function to get all users
const _getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, knex_1.db)("users").select("*");
    }
    catch (error) {
        console.error("Error fetching all the users:", error);
        throw new Error("Fetching all the users failed");
    }
});
exports._getAllUsers = _getAllUsers;
// Function to get user by mail
const _getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, knex_1.db)("users").where({ email }).first();
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Fetching user by email failed");
    }
});
exports._getUserByEmail = _getUserByEmail;
// Function to get user by id
const _getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, knex_1.db)("users").where({ id }).first();
    }
    catch (error) {
        console.error("Error fetching user by id:", error);
        throw new Error("User fetching user by id failed");
    }
});
exports._getUserById = _getUserById;
// Function to get user by name
const _getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.db)("users").where({ name }).first();
});
exports._getUserByName = _getUserByName;
// Function to create new user
const _createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [newUser] = yield (0, knex_1.db)("users").insert(userData).returning("*");
        return newUser;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
});
exports._createUser = _createUser;
// Function to update user profile
const _updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updateUser] = yield (0, knex_1.db)("users")
            .where({ id })
            .update(userData)
            .returning("*");
        return updateUser;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw new Error("User update failed");
    }
});
exports._updateUser = _updateUser;
// Function to delete user
const _deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [deletedUser] = yield (0, knex_1.db)("users")
            .where({ id })
            .del()
            .returning("*");
        return deletedUser;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("User deleting failed");
    }
});
exports._deleteUser = _deleteUser;
