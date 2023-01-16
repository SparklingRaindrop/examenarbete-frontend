import { useEffect, useRef, useState } from 'react';
import { useDisclosure } from '../../../hooks';
import { IconButton } from '../../elements';
import { Wrapper, Nav, NavItem } from './styled';

// TODO close on outside click
export default function Header() {
    const { isOpen, toggleIsOpen } = useDisclosure();
    const ref = useRef<HTMLElement>(null);

    return (
        <Wrapper>
            <IconButton
                name='hamburger'
                variant='ghost'
                onClick={toggleIsOpen} />
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