import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserRole } from "@/lib/mock-data";

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  userName: "",
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);

  const nameMap: Record<UserRole, string> = {
    etudiant: "Amina Diallo",
    accompagnateur: "Dr. Fatima Zahra",
    admin: "Administrateur",
  };

  const login = (r: UserRole) => {
    setRole(r);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userName: role ? nameMap[role] : "", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
