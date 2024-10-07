"use client";

import { useColorScheme } from "@/utils/useColorSheme";
import { GlobalStore, useGlobalStore } from "@/utils/useGlobalStore";
import { useEffect } from "react";
import SingleTooltip from "./common/SingleTooltip";

export const DarkModeSwitcher = () => {
  const { isDark, setIsDark } = useColorScheme();
  const changeGlobalDarkness = useGlobalStore(
    (state) => (state as GlobalStore).setIsDark
  );

  useEffect(() => {
    changeGlobalDarkness(isDark);
  }, [isDark]);

  return (
    <SingleTooltip
      place="bottom-start"
      id="dark-mode"
      text={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <button
        data-theme-toggle
        className="button"
        data-tooltip-id="dark-mode"
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
    </SingleTooltip>
  );
};
