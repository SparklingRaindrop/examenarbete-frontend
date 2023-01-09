import { Dispatch, SetStateAction } from 'react';
import { IconButton } from '../Button';
import { Input, Wrapper } from './styled';

type Props = {
    value: number;
    setCounterValue: (value: number) => void;
};

export default function Counter(props: Props) {
    const { value, setCounterValue } = props;

    return (
        <Wrapper>
            <IconButton
                name='minus'
                disabled={value === 0}
                onClick={() => setCounterValue(-1)} />
            <Input
                onChange={(event) => setCounterValue(Number(event.target.value))}
                value={value} />
            <IconButton
                name='plus'
                onClick={() => setCounterValue(1)} />
        </Wrapper>
    );
}