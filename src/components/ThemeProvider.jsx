import { createContext, useContext, useEffect, useState } from "react";

// Define Theme types
const ThemeContext = createContext({
  theme: "light", // default theme is light
  setTheme: () => null, // no-op function as placeholder
});

export const ThemeProvider = ({
  children,
  defaultTheme = "light", // Set defaultTheme to "light"
  storageKey = "vite-ui-theme",
}) => {
  // Initialize theme state from localStorage or fallback to defaultTheme
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove any previously applied theme classes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Detect system theme preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // Apply selected theme
    root.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook for consuming theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
