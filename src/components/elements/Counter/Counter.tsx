import { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { Icon } from '../Icon';
import { Input, Wrapper, Button } from './styled';

type Props = {
    value: number;
    onPlus: (event: MouseEvent<HTMLButtonElement>) => void;
    onMinus: (event: MouseEvent<HTMLButtonElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export default function Counter(props: Props) {
    const { value, onPlus, onMinus, onChange, onBlur } = props;

    return (
        <Wrapper>
            <Button
                disabled={value === 0}
                onClick={onMinus}>
                <Icon name='minus' />
            </Button>
            <Input
                value={value}
                onChange={onChange}
                onBlur={onBlur} />
            <Button
                name='plus'
                onClick={onPlus}>
                <Icon name='plus' />
            </Button>
        </Wrapper>
    );
}


/* export default function Counter(props: Props) {
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
} */