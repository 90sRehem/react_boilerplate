import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextData {
  toggleColorMode: () => void;
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleColorMode = useCallback(() => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode }}>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

function useCustomTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useCustomTheme must be used with a ThemeProvider.');
  }

  return context;
}

export { ThemeProvider, useCustomTheme };
