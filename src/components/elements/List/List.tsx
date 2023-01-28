import { ReactNode } from 'react';
import { UnorderedList } from './styled';

type Props = {
    children: ReactNode;
} & GeneralProps;

export default function List(props: Props) {
    const { children } = props;

    return (
        <UnorderedList {...props}>
            {children}
        </UnorderedList>
    );
}