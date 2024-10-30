import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  getAllUsers,
  getUserById,
  getUserByMail,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.get("/mail", authenticateToken, getUserByMail);
router.get("/name", authenticateToken, getUserByName);
router.post("/", authenticateToken, createUser);
router.put("/users", authenticateToken, updateUser);
router.delete("/users/:id", authenticateToken, deleteUser);

export default router;
