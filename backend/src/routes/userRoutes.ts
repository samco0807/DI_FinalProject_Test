import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  getUserByMail,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/users",getAllUsers);
router.get("/user/:id", getUserById);
router.get("/user/mail", getUserByMail);
router.get("/user/name", getUserByName);
router.post("/", createUser);
router.put("/users", updateUser);
router.delete("/users/:id", deleteUser);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.get("/auth", userController, authenticateToken.verifyAuth);

export default router;