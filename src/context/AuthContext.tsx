
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=User&background=27AE60&color=fff"
  }
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authenticated user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (in a real app, this would be an API call)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === "password") { // Simple mock password check
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      toast.error("Email already in use");
      setIsLoading(false);
      return;
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "user",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=27AE60&color=fff`
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast.success("Account created successfully");
    navigate("/dashboard");
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user, 
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
