"use client";

import { useEffect, useState } from "react";

export function useSavedItems(storageKey: string) {
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed)) {
        setSavedItems(parsed);
      }
    } catch {
      setSavedItems([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(savedItems));
  }, [savedItems, storageKey]);

  const toggleSaved = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return {
    savedItems,
    toggleSaved
  };
}
