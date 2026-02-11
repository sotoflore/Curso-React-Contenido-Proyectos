import { createContext } from "react";
import type { User } from "./auth-provider";

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
}
// 1. Crear el contexto con un valor por defecto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
