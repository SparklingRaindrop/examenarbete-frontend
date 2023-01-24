import { useState } from 'react';

export default function useDisclosure(): {
    isOpen: boolean;
    toggleIsOpen: (value?: boolean) => void;
    onClose: () => void;
} {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleIsOpen(value?: boolean) {
        setIsOpen(prev => value ? value : !prev);
    }

    function onClose() {
        setIsOpen(false);
    }

    return {
        isOpen,
        toggleIsOpen,
        onClose
    };
}