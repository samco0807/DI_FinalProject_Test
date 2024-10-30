// backend/src/types/express.d.ts
import { User } from '../models/User'; // Ajustez le chemin selon votre structure

declare global {
  namespace Express {
    interface Request {
      user?: User; // Utilisez '?' si `user` peut être undefined
    }
  }
}