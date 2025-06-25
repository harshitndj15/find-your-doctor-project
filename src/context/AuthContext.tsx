import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { mockPatients, mockDoctors, adminCredentials } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check admin credentials
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const adminUser: User = {
        id: 'admin',
        email: adminCredentials.email,
        name: 'Admin',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setLoading(false);
      return true;
    }

    // Check patient credentials (simplified - in real app, passwords would be hashed)
    const patient = mockPatients.find(p => p.email === email);
    if (patient && password === 'password') {
      setUser(patient);
      localStorage.setItem('user', JSON.stringify(patient));
      setLoading(false);
      return true;
    }

    // Check doctor credentials
    const doctor = mockDoctors.find(d => d.email === email);
    if (doctor && password === 'password') {
      setUser(doctor);
      localStorage.setItem('user', JSON.stringify(doctor));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would make an API call
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};