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
 * Forces the document class to light immediately.
 */
export const themeScript = `
  (function() {
    try {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    } catch(e) {}
  })();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    localStorage.setItem("theme", "light");
    setTheme("light");
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    // Locked to light theme - no-op
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
