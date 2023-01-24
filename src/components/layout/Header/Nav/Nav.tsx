import Link from 'next/link';
import { Menu, MenuItem, Wrapper } from './styled';


const LINKS = [{
    label: 'groceries',
    url: '/user/groceries',
}, {
    label: 'stocks',
    url: '/user/stocks',
}, {
    label: 'recipes',
    url: '/user/recipes',
}, {
    label: 'plans',
    url: '/user/plans',
}, {
    label: 'items',
    url: '/user/items',
}];

type Props = {
    isOpen: boolean;
}

export default function Nav(props: Props) {
    const { isOpen } = props;

    return (
        <Wrapper isOpen={isOpen}>
            <Menu>
                {
                    LINKS.map(({ url, label }) => (
                        <MenuItem key={label}>
                            <Link href={url}>
                                {label}
                            </Link>
                        </MenuItem>
                    ))
                }
            </Menu>
        </Wrapper>
    );
}