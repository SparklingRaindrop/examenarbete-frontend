import { Wrapper, Nav } from './styled';
import { Fredoka_One } from '@next/font/google';
const fredokaOne = Fredoka_One({ weight: '400' });

export default function Header() {
    return (
        <Wrapper>
            <div className={fredokaOne.className}>Smapp</div>
            <Nav>
                <ul>
                    <li>Home</li>
                </ul>
            </Nav>
        </Wrapper>
    )
}