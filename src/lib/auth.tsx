import {
  useCallback,
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { useMutation } from 'react-query';

import { storage } from '@/utils/storage';
import {
  AuthUser,
  LoginCredentialsDTO,
  LoginWithEmailAndPassword,
} from '@/features/auth';
import { AxiosError } from 'axios';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: AuthUser;
  signIn: (credentials: LoginCredentialsDTO) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const localUser = storage.getItem({ key: 'user', storageType: 'local' });
  const sessionUser = storage.getItem({ key: 'user', storageType: 'session' });

  const [user, setUser] = useState(() => {
    if (localUser) {
      return localUser;
    }

    if (sessionUser) {
      return {
        sessionUser,
      };
    }
    return null;
  });

  const isAuthenticated = !!user;

  const mutation = useMutation(
    async (formData: LoginCredentialsDTO) => {
      const data = await LoginWithEmailAndPassword(formData);

      return data;
    },
    {
      onSuccess: (response, { rememberMe }) => {
        const { user } = response;
        setUser(user);
        if (rememberMe) {
          storage.setItem({ key: 'user', storageType: 'local', values: user });
        } else {
          storage.setItem({
            key: 'user',
            storageType: 'session',
            values: user,
          });
        }
      },
      onError: (error: AxiosError) => {
        console.log(error);
        // addToast({ type: 'error', message: error.response?.data?.message });
      },
    },
  );

  const signIn = async ({
    email,
    password,
    rememberMe,
  }: LoginCredentialsDTO) => {
    try {
      await mutation.mutateAsync({
        email,
        password,
        rememberMe,
      });
      mutation.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = useCallback(() => {
    Object.keys(localStorage)
      .filter(id => id.includes('@move_client:'))
      .map(item => localStorage.removeItem(item));

    Object.keys(sessionStorage)
      .filter(id => id.includes('@move_client:'))
      .map(item => localStorage.removeItem(item));
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
