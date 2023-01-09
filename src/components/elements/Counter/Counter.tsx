import { Dispatch, SetStateAction } from 'react';
import { IconButton } from '../Button';
import { Input, Wrapper } from './styled';

type Props = {
    value: number;
    setCounterValue: Dispatch<SetStateAction<number>>;
};

export default function Counter(props: Props) {
    const { value, setCounterValue } = props;

    return (
        <Wrapper>
            <IconButton
                name='minus'
                disabled={value === 0}
                onClick={() => setCounterValue(pre => {
                    if (pre === 0) return pre;
                    return pre - 1;
                })} />
            <Input
                onChange={(event) => setCounterValue(Number(event.target.value))}
                value={value} />
            <IconButton
                name='plus'
                onClick={() => setCounterValue(pre => pre + 1)} />
        </Wrapper>
    );
}