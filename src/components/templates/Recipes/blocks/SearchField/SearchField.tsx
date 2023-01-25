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
            <Input
                value={value}
                onChange={onChange}
                placeholder='Write keyword...' />
        </Wrapper>
    );
}