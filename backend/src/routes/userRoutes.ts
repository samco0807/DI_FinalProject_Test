import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getUserByMail,getUserByName,createUser, updateUser,deleteUser} from "../controllers/userController.js";

const router = Router();

router.get("/user/mail", userController.getUserByMail);
router.get("/user/name", userController.getUserByName);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", userController.logoutUser);
router.put("/users", userController.updateUser);
router.delete("/users", userController.deleteUser);

router.get("/all", userController, authMiddleware.getUsers);
router.get("/auth", userController, authMiddleware.verifyAuth);

module.exports = router;