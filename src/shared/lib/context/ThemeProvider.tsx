import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const fallbackTheme = (localStorage.getItem('theme') as Theme) || Theme.LIGHT;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || fallbackTheme;
  });
  const rootElement = document.getElementById('root');

  useEffect(() => {
    if (rootElement) {
      rootElement.className = theme;
    }
  }, [theme]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
