import { useRouter } from 'next/router';
import useOutsideDetector from '../../../../hooks/useOutsideDetector';
import { Overlay } from '../../../elements';
import { Menu, MenuItem, Wrapper } from './styled';


const LINKS = [{
    label: 'dashboard',
    path: '/user',
}, {
    label: 'groceries',
    path: '/user/groceries',
}, {
    label: 'stocks',
    path: '/user/stocks',
}, {
    label: 'recipes',
    path: '/user/recipes',
}, {
    label: 'plans',
    path: '/user/plans',
}, {
    label: 'items',
    path: '/user/items',
}];

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export default function Nav(props: Props) {
    const { isOpen, onClose } = props;
    const router = useRouter();
    const { containerRef } = useOutsideDetector(onClose);

    function handleOnClick(path: string): void {
        onClose();
        router.push(path);
    }

    return (
        <>
            <Wrapper
                isOpen={isOpen}
                ref={containerRef}>
                <Menu>
                    {
                        LINKS.map(({ path, label }) => (
                            <MenuItem
                                key={label}
                                isCurrent={path === router.pathname}
                                onClick={() => handleOnClick(path)}>
                                {label}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </Wrapper>
            {isOpen && <Overlay />}
        </>
    );
}