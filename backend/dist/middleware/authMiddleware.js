"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = exports.verifyAuth = void 0;
// backend/src/middleware/authMiddleware.ts
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.configDotenv;
const JWT_SECRET = process.env.JWT_SECRET;
/** generate and verify token */
const verifyAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(401).json({ message: "No Token Provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const newToken = jsonwebtoken_1.default.sign({ userId: decoded.userId, email: decoded.email }, JWT_SECRET, { expiresIn: "1h" });
        /** set token in httpOnly cookie */
        res.cookie("token", newToken, {
            httpOnly: true,
            maxAge: 3600 * 1000,
        });
        res.json({
            message: "Login successfuly",
            user: { userid: decoded.userId, email: decoded.email },
            accessToken: newToken,
        });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
    next();
};
exports.verifyAuth = verifyAuth;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access token missing." });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        const payload = decoded;
        req.user = {
            id: payload.userId,
            role: payload.role,
            name: payload.name,
            email: payload.email,
            password: payload.password,
        };
    });
    next();
};
exports.authenticateToken = authenticateToken;
// Middleware to check roles (optional)
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Forbidden: insufficient permissions." });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
