import { ChangeEvent } from 'react';
import { Input } from '../../../../elements';

type Props = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export default function Title(props: Props) {
    const { onChange, value } = props;
    return (
        <>
            <Input
                value={value}
                placeholder='Recipe title...'
                onChange={onChange} />
        </>
    )
}