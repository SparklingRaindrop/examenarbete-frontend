import { Wrapper } from './styled';

type Props = {
    value: string;
    onChange: () => void;
}

export default function Input(props: Props) {
    const { value, onChange } = props;
    return (
        <Wrapper value={value} onChange={onChange} />
    );
}