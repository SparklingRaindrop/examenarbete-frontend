import { MouseEvent, useCallback, useEffect, useRef } from 'react';

export default function useOutsideDetector(callback: () => void) {
    const containerRef = useRef<HTMLElement>(null);
    const handleClickOutside = useCallback((event: any): void => {
        if (containerRef.current &&
            !containerRef.current.contains(event.target as Element)) {
            callback();
        }
    }, [callback, containerRef]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [containerRef, handleClickOutside]);

    return { containerRef };
}