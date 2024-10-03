"use client";

import { useColorScheme } from "@/utils/useColorSheme";

export const DarkModeSwitcher = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <button
      data-theme-toggle
      className="button"
      onClick={() => setIsDark(!isDark)}
    >
      <span className="icon">
        {!isDark ? (
          <i className="fas fa-lg fa-sun" style={{ color: "orange" }}></i>
        ) : (
          <i className="fas fa-lg fa-moon" style={{ color: "purple" }}></i>
        )}
      </span>
    </button>
  );
};
