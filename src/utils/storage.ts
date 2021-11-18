import { storagePrefix } from '@/config';

type SetStorageItem = {
  key: string;
  values: Record<string, any>;
  storageType: 'local' | 'session';
};
type GetStorageItem = { key: string; storageType: 'local' | 'session' };
type ClearStorageItem = { key: string; storageType: 'local' | 'session' };

export const storage = {
  getItem: ({ key, storageType }: GetStorageItem): any | null => {
    if (storageType === 'local') {
      const localItemExists = window.localStorage.getItem(key);
      if (localItemExists) {
        return JSON.parse(localItemExists);
      }
    } else if (storageType === 'session') {
      const sessionItemExists = window.sessionStorage.getItem(key);
      if (sessionItemExists) {
        return JSON.parse(sessionItemExists);
      }
    }

    return null;
  },
  // eslint-disable-next-line consistent-return
  setItem: ({ key, values, storageType }: SetStorageItem): void => {
    if (storageType === 'local') {
      return window.localStorage.setItem(
        `${storagePrefix}${key}`,
        JSON.stringify(values),
      );
    }
    if (storageType === 'session') {
      return window.sessionStorage.setItem(
        `${storagePrefix}${key}`,
        JSON.stringify(values),
      );
    }
  },
  // eslint-disable-next-line consistent-return
  clearItem: ({ key, storageType }: ClearStorageItem) => {
    if (storageType === 'local') {
      return window.localStorage.removeItem(`${storagePrefix}${key}`);
    }
    if (storageType === 'session') {
      return window.sessionStorage.removeItem(`${storagePrefix}${key}`);
    }
  },
};
