import { RecipeData } from '../../../../../hooks/useRecipesAPI';
import { Button, Text } from '../../../../elements';
import InstructionTextarea from './InstructionTextarea';
import { Heading, Section } from '../styled';
import { FlexColumn } from '../../../../elements/Flex';
import { InstructionWrapper } from './styled';

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
        <Section>
            <Heading>
                Instructions
            </Heading>
            {
                instructions.map(({ step_no, instruction }) => (
                    <InstructionWrapper key={step_no + instruction}>
                        <h4>Step {step_no}:</h4>
                        <Text>{instruction}</Text>
                    </InstructionWrapper>
                ))
            }
            {
                isEditing &&
                <FlexColumn>
                    <h4>{instructions.length + 1}</h4>
                    <InstructionTextarea
                        addInstruction={addInstruction}
                        onClose={closeInstructionEditor} />
                </FlexColumn>
            }
            {
                !isEditing && (
                    <Button
                        label='add a new step'
                        onClick={openInstructionEditor} />
                )
            }
        </Section>
    );
}