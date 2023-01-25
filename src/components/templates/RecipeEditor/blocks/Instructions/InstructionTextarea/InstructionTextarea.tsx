import { useState } from 'react';
import { Button, Textarea } from '../../../../../elements';
import { Wrapper, FlexRow } from './styled';

type Props = {
    addInstruction: (newInstruction: string) => void;
    onClose: () => void;
}
export default function InstructionTextarea(props: Props) {
    const { addInstruction, onClose } = props;
    const [userInput, setUserInput] = useState<string>('');

    return (
        <Wrapper>
            <Textarea
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)} />
            <FlexRow>
                <Button
                    label='Add new instruction'
                    disabled={!userInput}
                    onClick={() => {
                        addInstruction(userInput);
                        onClose();
                        setUserInput('');
                    }} />
                <Button
                    label='Cancel'
                    onClick={onClose} />
            </FlexRow>
        </Wrapper>
    );
}