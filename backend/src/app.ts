// backend/src/app.ts
import express from "express";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import cors from "cors";

const port = 3000;

dotenv.config();

const app = express();
app.use(cors());

// app.get("/", (req, res) => res.send("Hello World!"));

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
