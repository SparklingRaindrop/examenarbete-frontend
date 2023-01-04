import { cloneElement, ReactElement } from 'react';
import Button from './Button';

type Props = {
    icon: ReactElement;
}

export default function IconButton(props: Props) {
    const { icon } = props;

    return (
        <Button>
            {cloneElement(icon)}
        </Button>
    );
}