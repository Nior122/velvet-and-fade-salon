import { createContext, useContext, useState, useEffect, useCallback } from "react";

const DarkModeCtx = createContext({ dark: true, toggle: () => {} });

export function useDarkMode() {
  return useContext(DarkModeCtx);
}

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Default to dark for the salon vibe, but respect stored preference
    const stored = localStorage.getItem("vf-theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
    // If no stored preference, check system preference; but default dark for salon
    const sys = window.matchMedia("(prefers-color-scheme: light)").matches;
    return !sys; // Default dark unless system explicitly wants light
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("vf-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);

  return (
    <DarkModeCtx.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeCtx.Provider>
  );
}