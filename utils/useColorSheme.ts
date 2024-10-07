"use client";
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import usePersistedState from "./usePersistedState";


export function useColorScheme() {
    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined
    );

    const [isDark, setIsDark] = usePersistedState('colorScheme', false)
    const value = useMemo(
        () => (isDark === undefined ? !!systemPrefersDark : isDark),
        [isDark, systemPrefersDark]
    );

    useEffect(() => {
        const htmltag = document.querySelector("html")
        if (htmltag) {
            htmltag.setAttribute("data-theme", value ? "dark" : "light");
        }
    }, [value]);

    useEffect(() => {
        const htmltag = document.querySelector("html")
        if (htmltag) {
            if (htmltag.getAttribute("data-theme") === "dark") {
                setIsDark(true);
            } else if (htmltag.getAttribute("data-theme") === "light") {
                setIsDark(false);
            } else {
                setIsDark(systemPrefersDark);
            }
        }
    }, []);

    return {
        isDark: value,
        setIsDark
    };
}