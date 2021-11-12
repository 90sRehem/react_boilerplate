const storagePrefix = '@onecar:';

export const tokenStorage = {
  getToken: (): { user: any; type: 'local' | 'session' } | null => {
    const localStoragedToken = window.localStorage.getItem(
      `${storagePrefix}token`,
    ) as string;

    const sessionStoragedToken = window.sessionStorage.getItem(
      `${storagePrefix}token`,
    ) as string;

    if (localStoragedToken) {
      const user = JSON.parse(localStoragedToken);
      return {
        ...user,
        type: 'local',
      };
    }
    if (sessionStoragedToken) {
      const user = JSON.parse(sessionStoragedToken);
      return {
        ...user,
        type: 'session',
      };
    }

    return null;
  },
  setToken: (token: string, type: 'session' | 'local'): void => {
    if (type === 'local') {
      window.localStorage.setItem(
        `${storagePrefix}token`,
        JSON.stringify(token),
      );
    } else if (type === 'session') {
      window.sessionStorage.setItem(
        `${storagePrefix}token`,
        JSON.stringify(token),
      );
    }
  },
  clearToken: (type: 'session' | 'local'): void => {
    if (type === 'local') {
      window.localStorage.removeItem(`${storagePrefix}token`);
    } else if (type === 'session') {
      window.sessionStorage.removeItem(`${storagePrefix}token`);
    }
  },
};
