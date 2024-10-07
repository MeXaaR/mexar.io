"use client";
import { useState, useEffect } from 'react';

function usePersistedState<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const isClient = typeof window !== 'undefined';

    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        if (isClient) {
            const storedValue = localStorage.getItem(key);
            if (storedValue !== null) {
                setState(JSON.parse(storedValue));
            }
        }
    }, [isClient, key]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [isClient, key, state]);

    return [state, setState];
}

export default usePersistedState;
