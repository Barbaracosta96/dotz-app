import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user; // Verifica se há um usuário logado

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persistir o usuário no localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Limpar o usuário do localStorage
  };

  // Na inicialização do componente, tenta recuperar o usuário do localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//types
import { User } from '../types/User';