import { ChangeEvent } from 'react';
import { StyledTextarea } from './styled';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea(props: Props) {
    const { value, onChange } = props;
    return (
        <StyledTextarea
            value={value}
            onChange={onChange}
        />
    );
}