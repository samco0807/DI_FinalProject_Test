// backend/src/routes/eventRoutes.ts
import express from "express";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// GET /api/events
router.get("/", getAllEventsHandler);

// GET /api/events/:id
router.get("/:id", getEventByIdHandler);

// POST /api/events (protected)
router.post("/", authenticateToken, createEventHandler);

// PUT /api/events/:id (protected)
router.put("/:id", authenticateToken, updateEventHandler);

// DELETE /api/events/:id (protected)
router.delete("/:id", authenticateToken, deleteEventHandler);

export default router;
