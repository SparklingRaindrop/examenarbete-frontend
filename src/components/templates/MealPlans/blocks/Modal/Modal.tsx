import { useState } from 'react';
import { IconButton, Input } from '../../../../elements';
import { FlexRow, Wrapper, Result } from './styled';


type Props = {}
const sample = [
    {
        id: 'qweqwe',
        title: 'dfsdfdsf'
    }, {
        id: 'qweqwdfge',
        title: 'dfsdfdsf'
    }
];

export default function Modal({ }: Props) {
    const [userInput, setUserInput] = useState<string>('');

    return (
        <Wrapper>
            <FlexRow>
                <Input
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)} />
                <IconButton name='magnifyingGlass' />
            </FlexRow>
            <Result>
                {
                    sample.length === 0 ?
                        <div>No matches</div> :
                        sample.map(recipe => <div key={recipe.id}>{recipe.title}</div>)
                }
            </Result>
        </Wrapper>
    );
}