"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("ace-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("ace-theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 hover:bg-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-3 h-3" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3 h-3" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}
