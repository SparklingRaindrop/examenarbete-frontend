import { ChangeEvent } from 'react';
import { Checkbox, Icon } from '../../../elements';
import { Wrapper } from './styled';

type Props = {
    toggle: () => void;
    handleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: string) => Promise<void>;
}
export default function GroceryInput(props: Props) {
    const { toggle, handleCheckbox } = props;

    return (
        <Wrapper>
            <Icon name='sixDots' />
            <Checkbox
                checked={false}
                onChange={() => { }} />
            <input
                type='text'
                onBlur={() => toggle()}
                autoFocus />
        </Wrapper>

    );
}