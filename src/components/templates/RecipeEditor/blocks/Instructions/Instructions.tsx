import { RecipeData } from '../../../../../hooks/useRecipesAPI';
import { Button } from '../../../../elements';
import InstructionTextarea from './InstructionTextarea';
import { Heading } from '../styled';

type Props = {
    isEditing: boolean;
    instructions: RecipeData['instructions'];
    addInstruction: (newInstruction: string) => void;
    closeInstructionEditor: () => void;
    openInstructionEditor: () => void;
}

export default function Instructions(props: Props) {
    const {
        isEditing,
        instructions,
        openInstructionEditor,
        closeInstructionEditor,
        addInstruction } = props;

    return (
        <>
            <Heading>
                How to cook
            </Heading>
            {
                instructions.map(({ step_no, instruction, id }) => (
                    <div key={id}>
                        <h4>{step_no}</h4>
                        <p>{instruction}</p>
                    </div>
                ))
            }
            {
                isEditing &&
                <div>
                    <h4>{instructions.length + 1}</h4>
                    <InstructionTextarea
                        addInstruction={addInstruction}
                        onClose={closeInstructionEditor} />
                </div>
            }
            <Button
                label='add a new step'
                onClick={openInstructionEditor} />
        </>
    )
}