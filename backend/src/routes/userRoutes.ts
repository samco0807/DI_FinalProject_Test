import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getUserByMail,getUserByName,createUser, updateUser,deleteUser} from "../controllers/userController.js";

const router = Router();

router.get("/user", userController.getUserByMail);
router.get("/user", userController.getUserByName);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", userController.logoutUser);
router.put("/users", userController.updateUser);
router.delete("/users", userController.deleteUser);

router.get("/all", authenticateToken, authMiddleware.getUsers);
router.get("/auth", authenticateToken, authMiddleware.verifyAuth);

module.exports = router;