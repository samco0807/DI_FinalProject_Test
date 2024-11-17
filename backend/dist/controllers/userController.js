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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByName = exports.getUserById = exports.getUserByMail = exports.logoutUser = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
// Function to get all the users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1._getAllUsers)();
        res.json(users.map((user) => (Object.assign(Object.assign({}, user), { password: undefined }))));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
// Function for user logout
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
};
exports.logoutUser = logoutUser;
// Function to find user by email
const getUserByMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    try {
        const user = yield (0, userModel_1._getUserByEmail)(userEmail);
        if (!user) {
            return res.status(404).json({ message: "User with email not found." });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Server error while fetching user profile by mail." });
    }
});
exports.getUserByMail = getUserByMail;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield (0, userModel_1._getUserById)(userId);
        if (!user) {
            return res.status(404).json({ message: "User with email not found." });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Server error while fetching user profile by mail." });
    }
});
exports.getUserById = getUserById;
// Function to find user by name
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userName = (_a = req.user) === null || _a === void 0 ? void 0 : _a.name;
    try {
        const user = yield (0, userModel_1._getUserByName)(userName);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
        // exclude password from response
        const userData = __rest(user, []);
        res.status(200).json(userData);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Server error while fetching user profile by name." });
    }
});
exports.getUserByName = getUserByName;
// Function to create new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res
            .status(400)
            .json({ message: "You must complete the informations" });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield (0, userModel_1._createUser)({
            name,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error while creating new user." });
    }
});
exports.createUser = createUser;
// Function to update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Make sure `req.user` contains the user ID
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
        const updatedUser = yield (0, userModel_1._updateUser)(userId, userData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Server error while updating user." });
    }
});
exports.updateUser = updateUser;
// Function to delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // Check that the user ID is present
    if (!userId) {
        return res
            .status(400)
            .json({ message: "User ID is required for deletion." });
    }
    try {
        yield (0, userModel_1._deleteUser)(userId);
        res.status(204).send(); // No content to send back
    }
    catch (error) {
        res.status(500).json({ message: "Server error while deleting user." });
    }
});
exports.deleteUser = deleteUser;
