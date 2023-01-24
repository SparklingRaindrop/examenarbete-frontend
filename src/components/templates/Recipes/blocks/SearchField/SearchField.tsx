import { ChangeEvent } from 'react';
import { Input } from '../../../../elements';
import { Wrapper } from './styled';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchField(props: Props) {
    const { value, onChange } = props;
    return (
        <Wrapper>
            <h3>
                Search
            </h3>
            <Input
                value={value}
                onChange={onChange} />
        </Wrapper>
    );
}