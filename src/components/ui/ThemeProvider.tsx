"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  mounted: false,
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/**
 * Inline script injected into <head> to prevent flash of wrong theme.
 * Forces the document class to dark immediately.
 */
export const themeScript = `
  (function() {
    try {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } catch(e) {}
  })();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    localStorage.setItem("theme", "dark");
    setTheme("dark");
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    // Locked to dark theme - no-op
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
