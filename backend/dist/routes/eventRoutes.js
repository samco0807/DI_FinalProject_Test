"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/eventRoutes.ts
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
// GET /api/events
router.get("/", eventController_1.getAllEvents);
// GET /api/events/:id
router.get("/:id", eventController_1.getEventById);
// POST /api/events (protected)
router.post("/create-event", eventController_1.createEvent);
// PUT /api/events/:id (protected)
router.put("/:id", eventController_1.updateEvent);
// DELETE /api/events/:id (protected)
router.delete("/:id", eventController_1.deleteEvent);
// Route to test where is the issue when we try to display the events in the browser
router.get("/test", eventController_1.test);
exports.default = router;
