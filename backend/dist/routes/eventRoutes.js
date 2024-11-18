"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/eventRoutes.ts
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// GET /api/events
router.get("/", eventController_1.getAllEvents);
// GET /api/events/:id
router.get("/:id", eventController_1.getEventById);
// POST /api/events (protected)
router.post("/", authMiddleware_1.authenticateToken, eventController_1.createEvent);
// PUT /api/events/:id (protected)
router.put("/:id", authMiddleware_1.authenticateToken, eventController_1.updateEvent);
// DELETE /api/events/:id (protected)
router.delete("/:id", authMiddleware_1.authenticateToken, eventController_1.deleteEvent);
exports.default = router;
