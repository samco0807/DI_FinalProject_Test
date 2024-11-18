"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/app.ts
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.get("/", (req, res) => res.send("Hello World!"));
// Middlewares
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.default = app;
