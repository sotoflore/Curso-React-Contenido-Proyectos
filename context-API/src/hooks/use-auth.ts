// 3. Export el hook para usar el contexto en los componentes hijos

import { useContext } from "react";
import { AuthContext} from "../context/auth/auth-context";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}