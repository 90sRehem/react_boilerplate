import { storage } from '@/utils/storage';
import { AuthUser } from '..';

export function getUser(): AuthUser {
  const localUser = storage.getItem({ key: 'user', storageType: 'local' });
  const sessionUser = storage.getItem({ key: 'user', storageType: 'session' });

  if (localUser) {
    return localUser;
  }
  if (sessionUser) {
    return sessionUser;
  }

  return {} as AuthUser;
}
