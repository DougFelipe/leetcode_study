import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores.
 * Útil para evitar chamadas excessivas durante digitação.
 * 
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos
 * @returns Valor após o delay
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
