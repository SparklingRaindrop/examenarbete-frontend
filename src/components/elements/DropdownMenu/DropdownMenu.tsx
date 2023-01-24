import { useDisclosure } from '../../../hooks';
import useOutsideDetector from '../../../hooks/useOutsideDetector';
import { IconButton } from '../Button';
import { Menu, MenuItem, Wrapper } from './styled';

export interface MenuItem {
    label: string;
    onClick: () => void;
    isDisabled?: boolean,
}

type Props = {
    contents: MenuItem[];
}

export default function DropdownMenu(props: Props) {
    const { contents } = props;
    const { isOpen, toggleIsOpen, onClose } = useDisclosure();
    const { containerRef } = useOutsideDetector(onClose);

    return (
        <Wrapper>
            <IconButton
                name='threeDots'
                variant='ghost'
                onClick={toggleIsOpen} />
            {isOpen && (
                <Menu ref={containerRef as React.RefObject<HTMLDivElement>}>
                    {
                        contents.map(({ label, onClick, isDisabled }) => (
                            <MenuItem
                                key={label}
                                disabled={isDisabled}
                                onClick={onClick}>
                                {label}
                            </MenuItem>
                        ))
                    }
                </Menu>
            )}
        </Wrapper>
    );
}