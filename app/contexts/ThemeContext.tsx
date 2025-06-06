'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [primaryColor, setPrimaryColor] = useState('#0084C2');

  useEffect(() => {
    // Fetch primary color from api and set on document root
    document.documentElement.style.setProperty('--brand-600', primaryColor);
  }, [primaryColor]);

  const updatePrimaryColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    document.documentElement.style.setProperty('--brand-600', e.target.value);
  };

  const contextValue = useMemo(
    () => ({ primaryColor, updatePrimaryColor }),
    [primaryColor] // Recalculate the context value only when primaryColor changes
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
