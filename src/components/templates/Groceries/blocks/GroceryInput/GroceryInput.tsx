import { useState } from 'react';
import { useGroceriesContext } from '../../../../../hooks';
import { Checkbox, Icon } from '../../../../elements';
import { InputField, Wrapper } from './styled';

type Props = {
    toggle: () => void;
}

export default function GroceryInput(props: Props) {
    const { toggle } = props;
    const [userInput, setUserInput] = useState<string>('');
    const { addGrocery } = useGroceriesContext();

    return (
        <Wrapper>
            <Icon name='sixDots' />
            <Checkbox
                checked={false}
                onChange={() => { }} />
            <InputField
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                onBlur={() => toggle()} />
        </Wrapper>

    );
}