import { useState } from 'react';
import { IconButton } from '../../../../../elements';

type Props = {
    addInstruction: (newInstruction: string) => void;
    onClose: () => void;
}
export default function InstructionTextarea(props: Props) {
    const { addInstruction, onClose } = props;
    const [userInput, setUserInput] = useState<string>('');

    return (
        <div>
            <textarea
                value={userInput}
                rows={5}
                cols={33}
                onChange={(event) => setUserInput(event.target.value)}
                autoFocus></textarea>
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