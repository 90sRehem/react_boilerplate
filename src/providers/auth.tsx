import { useCallback, createContext, useContext, ReactNode } from 'react';
import { useMutation } from 'react-query';

import {
  AuthUser,
  loginFn,
  logoutFn,
  LoginCredentialsDTO,
} from '@/features/auth';
import { useUserStore } from '@/stores';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: AuthUser;
  signIn: (credentials: LoginCredentialsDTO) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { user } = useUserStore();

  const isAuthenticated = !!Object.keys(user).length;

  const mutation = useMutation(async (formData: LoginCredentialsDTO) => {
    return loginFn(formData);
  });

  const signIn = async (data: LoginCredentialsDTO) => {
    try {
      await mutation.mutateAsync(data);
      mutation.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = useCallback(() => {
    logoutFn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated,
        loading: mutation.isLoading,
        success: mutation.isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider');
  }

  return context;
}

export { AuthProvider, useAuth };
