import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserByMail,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/users/:id", userController.getAllUsers);
router.get("/user/mail", userController.getUserByMail);
router.get("/user/name", userController.getUserByName);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", userController.logoutUser);
router.put("/users", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/auth", userController, authenticateToken.verifyAuth);

export default router;