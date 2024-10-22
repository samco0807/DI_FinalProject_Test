// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface JwtPayload {
  userId: number;
  role: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    name: string;
    email: string;
  };
}

/** generate and verify token */
export const verifyAuth = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No Taken Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userid: number,
      email: string,
    };
    const newToken = jwt.sign(
      { userid: decoded.userid, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    /** set token in httpOnly cookie */
    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    res.json({
      message: "Login successfuly",
      user: { userid: decoded.userid, email: decoded.email },
      accessToken: newToken,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing." });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    const payload = decoded as JwtPayload;
    req.user = {
      id: payload.userId,
      role: payload.role,
      name: payload.name,
      email: payload.email,
    };

    next();
  });
};

// Middleware to check roles (optional)
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions." });
    }
    next();
  };
};
