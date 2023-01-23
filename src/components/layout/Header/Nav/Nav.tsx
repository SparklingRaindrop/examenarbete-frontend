import Link from 'next/link';
import { Wrapper } from './styled';
import { MenuItem } from '../styled';


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

    if (!isOpen) return null;
    return (
        <Wrapper>

            {
                LINKS.map(({ url, label }) => (
                    <MenuItem key={label}>
                        <Link href={url}>
                            {label}
                        </Link>
                    </MenuItem>
                ))
            }


        </Wrapper>
    );
}