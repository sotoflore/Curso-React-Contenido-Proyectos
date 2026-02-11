import { useState } from "react";
import { AuthContext } from "../auth/auth-context";

export interface User{
    name: string;
    email: string;
}


interface Props{
    children?: React.ReactNode;
}

// 2. Crear el provider que envuelve a la aplicación y proporciona el estado de autenticación
const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<User | null>(null);

    const login = () => {
         setUser({ name: "John Doe", email: "john.doe@example.com" });
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext value={{ user, login, logout }}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider;

