import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('auth', JSON.stringify({ user }));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('auth');
  },
}));