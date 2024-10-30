"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_js_1 = require("../controllers/userController.js");
const router = (0, express_1.Router)();
router.get("/users", userController_js_1.getAllUsers);
router.get("/user/:id", userController_js_1.getUserById);
router.get("/user/mail", userController_js_1.getUserByMail);
router.get("/user/name", userController_js_1.getUserByName);
router.post("/", userController_js_1.createUser);
router.put("/users", userController_js_1.updateUser);
router.delete("/users/:id", userController_js_1.deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.get("/auth", userController, authMiddleware_1.authenticateToken.verifyAuth);
exports.default = router;
