// backend/src/routes/eventRoutes.ts
import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// GET /api/events
router.get("/", getAllEvents);

// GET /api/events/:id
router.get("/:id", getEventById);

// POST /api/events (protected)
router.post("/", createEvent);

// PUT /api/events/:id (protected)
router.put("/:id", updateEvent);

// DELETE /api/events/:id (protected)
router.delete("/:id", deleteEvent);

export default router;