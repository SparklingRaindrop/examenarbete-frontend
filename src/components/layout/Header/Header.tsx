import { useEffect, useRef, useState } from 'react';
import { IconButton } from '../../elements';
import { Wrapper, Nav, NavItem } from './styled';

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLElement>(null);

    return (
        <Wrapper>
            <IconButton
                name='hamburger'
                variant='ghost'
                onClick={() => setIsOpen(prev => !prev)} />
            {
                isOpen && <Nav ref={ref}>
                    <ul>
                        <NavItem>Test1</NavItem>
                        <NavItem>Test2</NavItem>
                        <NavItem>Test3</NavItem>
                    </ul>
                </Nav>
            }
            <div>Smapp</div>
        </Wrapper>
    );
}