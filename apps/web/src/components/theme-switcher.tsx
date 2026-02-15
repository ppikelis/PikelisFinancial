"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "seeking-alpha", label: "Seeking Alpha" },
  { id: "zacks", label: "Zacks" },
  { id: "quiver", label: "Quiver" },
  { id: "aurora", label: "Aurora (Custom)" }
];

const STORAGE_KEY = "finadvisor-theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("seeking-alpha");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored ?? "seeking-alpha";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const handleChange = (value: string) => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">Theme</span>
      <select
        value={theme}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
      >
        {THEMES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
