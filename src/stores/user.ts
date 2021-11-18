import { AuthUser } from '@/features/auth';
import create from 'zustand';

type UserStore = {
  user: AuthUser;
  storeUser: (user: AuthUser) => void;
  removeUser: (id: string) => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: {} as AuthUser,
  storeUser: data => set({ user: data }),
  removeUser: id => set(state => (state.user?.id === id ? {} : state.user)),
}));
