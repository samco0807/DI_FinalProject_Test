"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const eventModel_1 = require("../models/eventModel");
// POST /api/events
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, category, location, date, time } = req.body;
    const organizer_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // 1. we check if the organizer id exist so that the user can create the event
    if (!organizer_id) {
        return res.status(401).json({ message: "Unauthorized. No organizer ID" });
    }
    // 2. We check if every field is filled
    if (!title || !description || !category || !location || !date || !time) {
        return res.status(400).json({ message: "All event fields are required." });
    }
    try {
        const newEvent = {
            title,
            description,
            category,
            location,
            date,
            time,
            organizer_id,
        };
        const createdEvent = yield (0, eventModel_1._createEvent)(newEvent);
        res.status(201).json(createdEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while creating event." });
    }
});
exports.createEvent = createEvent;
// GET /api/events
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, eventModel_1._getAllEvents)();
        res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching events." });
    }
});
exports.getAllEvents = getAllEvents;
// GET /api/events/:id
const getEventById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield (0, eventModel_1._getEventById)(Number(id));
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getEventById = getEventById;
// PUT /api/events/:id
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { title, description, category, location, date, time } = req.body;
    const organizer_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // 1.We check if the event exists with the event id
        const event = yield (0, eventModel_1._getEventById)(Number(id));
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        // 2. If the event exists, we check if the user is an organizer
        if (event.organizer_id !== organizer_id) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update this event." });
        }
        // 3. if the event exists and the user is an organizer, the event is updated
        const updatedEvent = yield (0, eventModel_1._updateEvent)(Number(id), {
            title,
            description,
            category,
            location,
            date,
            time,
        });
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while updating event." });
    }
});
exports.updateEvent = updateEvent;
// DELETE /api/events/:id
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const organizer_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // 1. We check if the event exists with the id
        const event = yield (0, eventModel_1._getEventById)(Number(id));
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        // 2. we check if the user is an organizer with the organizer id
        if (event.organizer_id !== organizer_id) {
            return res
                .status(403)
                .json({ message: "Unauthorized to delete this event." });
        }
        // 3. if the event exists and the user is an organizer, the event is deleted
        yield (0, eventModel_1._deleteEvent)(Number(id));
        res.status(200).json({ message: "Event deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting event." });
    }
});
exports.deleteEvent = deleteEvent;
