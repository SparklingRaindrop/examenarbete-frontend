import { useState } from 'react';

export default function useDisclosure(): {
    isOpen: boolean;
    toggleIsOpen: () => void;
} {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleIsOpen() {
        setIsOpen(prev => !prev);
    }

    return {
        isOpen,
        toggleIsOpen
    };
}