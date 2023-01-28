import { useState } from 'react';

export default function useDisclosure(): {
    isOpen: boolean;
    toggleIsOpen: () => void;
    onClose: () => void;
    onOpen: () => void;
} {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleIsOpen() {
        setIsOpen(prev => !prev);
    }

    function onOpen() {
        setIsOpen(true);
    }

    function onClose() {
        setIsOpen(false);
    }

    return {
        isOpen,
        toggleIsOpen,
        onClose,
        onOpen,
    };
}