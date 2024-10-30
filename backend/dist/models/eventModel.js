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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteEvent = exports._updateEvent = exports._getEventById = exports._getAllEvents = exports._createEvent = void 0;
// backend/src/models/eventModel.ts
const knex_1 = __importDefault(require("../db/knex"));
const _createEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const [newEvent] = yield (0, knex_1.default)("events").insert(event).returning("*");
    return newEvent;
});
exports._createEvent = _createEvent;
const _getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.default)("events").select("*");
});
exports._getAllEvents = _getAllEvents;
const _getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.default)("events").where({ id }).first();
});
exports._getEventById = _getEventById;
const _updateEvent = (id, event) => __awaiter(void 0, void 0, void 0, function* () {
    const [updatedEvent] = yield (0, knex_1.default)("events")
        .where({ id })
        .update(event)
        .returning("*");
    return updatedEvent;
});
exports._updateEvent = _updateEvent;
const _deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, knex_1.default)("events").where({ id }).del();
});
exports._deleteEvent = _deleteEvent;
