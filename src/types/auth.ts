export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'patient' | 'doctor' | 'admin' | null;
  login: (role: 'patient' | 'doctor' | 'admin') => void;
  logout: () => void;
} 