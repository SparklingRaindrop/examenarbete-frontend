import { useEffect, useState } from 'react';
import { IconButton } from '../Button';
import { Input, Wrapper } from './styled';

type Props = {
    value: number;
    setCounterValue: (value: number, action?: 'replace') => void;
};

export default function Counter(props: Props) {
    const { value, setCounterValue } = props;
    // Keeping inputValue string allows users to hold empty input field
    const [inputValue, setInputValue] = useState<string>(value.toString());

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    return (
        <Wrapper>
            <IconButton
                name='minus'
                disabled={value === 0}
                onClick={() => setCounterValue(-1)} />
            <Input
                value={inputValue}
                onChange={(event) => {
                    if (isNaN(Number(event.target.value))) return;
                    setInputValue(event.target.value);
                }}
                onBlur={() => {
                    if (inputValue === '') {
                        setInputValue('0');
                    }
                    setCounterValue(Number(inputValue === '' ? 0 : inputValue), 'replace');
                }} />
            <IconButton
                name='plus'
                onClick={() => setCounterValue(1)} />
        </Wrapper>
    );
}