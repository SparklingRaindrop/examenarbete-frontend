import { MouseEvent, useCallback, useEffect, useRef } from 'react';

type Props = {
    callback: () => void;
}

export default function useOutsideDetector(props: Props) {
    const { callback } = props;
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