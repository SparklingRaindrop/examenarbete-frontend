import { useDisclosure } from '../../../hooks';

import { IconButton } from '../../elements';
import Nav from './Nav';
import UserMenu from './UserMenu';
import { RightAlignBox, Wrapper } from './styled';

export default function Header() {
    const {
        isOpen: isNavOpen,
        toggleIsOpen: toggleNav,
        onClose: onCloseNav } = useDisclosure();
    const {
        isOpen: isUserMenuOpen,
        toggleIsOpen: toggleUserMenu,
        onClose: onCloseUserMenu } = useDisclosure();
    return (
        <Wrapper>
            {
                !isNavOpen &&
                <IconButton
                    name='hamburger'
                    variant='ghost'
                    onClick={() => {
                        toggleNav();
                        if (isUserMenuOpen) {
                            onCloseUserMenu();
                        }
                    }} />
            }
            <Nav
                isOpen={isNavOpen}
                onClose={onCloseNav} />
            <RightAlignBox>
                <IconButton
                    name='userCircle'
                    variant='ghost'
                    onClick={() => {
                        toggleUserMenu();
                        if (isNavOpen) {
                            onCloseNav();
                        }
                    }} />
                <UserMenu
                    isOpen={isUserMenuOpen}
                    onClose={onCloseUserMenu} />
            </RightAlignBox>
        </Wrapper>
    );
}