// backend/src/models/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
    // password: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
  }
  