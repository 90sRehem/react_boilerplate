import {
  loginWithEmailAndPassword,
  LoginCredentialsDTO,
  AuthUser,
} from '@/features/auth';
import { useUserStore } from '@/stores';
import { storage } from '@/utils/storage';

export async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const { user, token, refreshToken } = response;
  if (data.rememberMe === true) {
    useUserStore.setState({ user });
    storage.setItem({ key: 'token', storageType: 'local', values: { token } });
    storage.setItem({
      key: 'refreshToken',
      storageType: 'local',
      values: { refreshToken },
    });
    storage.setItem({ key: 'user', storageType: 'local', values: { user } });
  }

  storage.setItem({ key: 'token', storageType: 'session', values: { token } });
  storage.setItem({
    key: 'refreshToken',
    storageType: 'session',
    values: { refreshToken },
  });
  storage.setItem({ key: 'user', storageType: 'session', values: { user } });

  return response;
}

export function logoutFn() {
  useUserStore.setState({ user: {} as AuthUser });
  storage.clearItem({ key: 'token', storageType: 'local' });
  storage.clearItem({ key: 'refreshToken', storageType: 'local' });
  storage.clearItem({ key: 'user', storageType: 'local' });

  storage.clearItem({ key: 'token', storageType: 'session' });
  storage.clearItem({ key: 'refreshToken', storageType: 'session' });
  storage.clearItem({ key: 'user', storageType: 'session' });

  window.location.assign(window.location.origin as unknown as string);
}
