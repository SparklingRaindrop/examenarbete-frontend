import { Dispatch, SetStateAction } from 'react';
import { Button } from '../Button';
import { Input, Wrapper } from './styled';

type Props = {
    value: number;
    setCounterValue: Dispatch<SetStateAction<number>>;
};

export default function Counter(props: Props) {
    const { value, setCounterValue } = props;

    return (
        <Wrapper>
            <Button
                label='-'
                onClick={() => setCounterValue(pre => {
                    if (pre === 0) return pre;
                    return pre - 1;
                })}
                disabled={value === 0} />
            <Input
                onChange={(event) => setCounterValue(Number(event.target.value))}
                value={value} />
            <Button
                label='+'
                onClick={() => setCounterValue(pre => pre + 1)} />
        </Wrapper>
    );
}