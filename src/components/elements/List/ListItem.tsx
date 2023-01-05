import { ReactNode } from 'react';
import { StyledListItem } from './styled';

type Props = {
    children: ReactNode
} & GeneralProps;

export default function ListItem(props: Props) {
    const { children } = props;

    return (
        <StyledListItem>
            {children}
        </StyledListItem>
    )
}