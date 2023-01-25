import { useState } from 'react';
import { IconButton, Textarea } from '../../../../../elements';

type Props = {
    addInstruction: (newInstruction: string) => void;
    onClose: () => void;
}
export default function InstructionTextarea(props: Props) {
    const { addInstruction, onClose } = props;
    const [userInput, setUserInput] = useState<string>('');

    return (
        <div>
            <Textarea
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)} />
            <IconButton
                name='plus'
                onClick={() => {
                    addInstruction(userInput);
                    onClose();
                    setUserInput('');
                }} />
        </div>
    );
}