import { Input } from './styled';

type Props = {
    value: number;
    setCounterValue: (newValue: number) => void;
};

export default function Counter(props: Props) {
    const { value, setCounterValue } = props;
    return (
        <Input
            onChange={(event) => setCounterValue(Number(event.target.value))}
            value={value} />
    );
}