import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

type Props = {
    value: number | string;
    variant?: Variant;
    onChange: (input: string | number) => void;
}
export default function Input(props: Props) {
    const { value, variant, onChange } = props;
    return (
        <Wrapper
            value={value}
            variant={variant}
            onChange={(event) => onChange(event.target.value)} />
    );
}