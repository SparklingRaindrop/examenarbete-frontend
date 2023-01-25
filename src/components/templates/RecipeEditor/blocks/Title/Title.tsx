import { ChangeEvent } from 'react';
import { Input } from '../../../../elements';
import { Heading, Section } from '../styled';

type Props = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export default function Title(props: Props) {
    const { onChange, value } = props;
    return (
        <Section>
            <Heading>Title</Heading>
            <Input
                value={value}
                placeholder='Recipe title...'
                onChange={onChange} />
        </Section>
    )
}