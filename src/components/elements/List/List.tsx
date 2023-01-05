import { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { UnorderedList } from './styled';

interface Props extends CSSProperties {
    children: ReactNode;
}

export default function List(props: Props) {
    const { children } = props;

    return (
        <UnorderedList>
            {children}
        </UnorderedList>
    );
}