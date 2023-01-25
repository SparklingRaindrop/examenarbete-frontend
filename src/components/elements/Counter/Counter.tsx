import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { Icon } from '../Icon';
import { Input, Wrapper, Button } from './styled';

type Props = {
    value: number;
    onPlus: (event: MouseEvent<HTMLButtonElement>) => void;
    onMinus: (event: MouseEvent<HTMLButtonElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
};

export default function Counter(props: Props) {
    const { value, onPlus, onMinus, onChange, onBlur } = props;

    function handleOnKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            onBlur();
        }
    }

    return (
        <Wrapper>
            <Button
                disabled={value === 0}
                onClick={onMinus}>
                <Icon name='minus' />
            </Button>
            <Input
                type='number'
                value={value}
                onChange={onChange}
                onKeyDown={handleOnKeyDown}
                onBlur={onBlur} />
            <Button
                name='plus'
                onClick={onPlus}>
                <Icon name='plus' />
            </Button>
        </Wrapper>
    );
}