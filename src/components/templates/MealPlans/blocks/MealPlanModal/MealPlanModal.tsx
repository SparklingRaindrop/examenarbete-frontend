import { useState } from 'react';
import { useMealPlansContext, useRecipesContext } from '../../../../../hooks';
import { Status } from '../../../../../types/statusCode';
import { IconButton, Input, Modal } from '../../../../elements';
import { FlexRow, Result } from './styled';

type Props = {
    date: Date | null;
    type: string | null;
    onClose: () => void;
}

export default function MealPlanModal(props: Props) {
    const { date, type, onClose } = props;
    const [userInput, setUserInput] = useState<string>('');
    const [result, setResult] = useState<Recipe[]>([]);
    const { getRecipes } = useRecipesContext();
    const { addPlan } = useMealPlansContext();

    async function handleSearch() {
        const response = await getRecipes(userInput);
        if (response.data && response.status === Status.Succuss) {
            setResult(response.data);
        }
    }

    return (
        <Modal>
            <IconButton
                name='xMark'
                onClick={onClose} />
            <FlexRow>
                <Input
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)} />
                <IconButton
                    name='magnifyingGlass'
                    onClick={handleSearch} />
            </FlexRow>
            <Result>
                {
                    !result || result.length === 0 ?
                        <div>No matches</div> :
                        result.map(({ id, title }) => (
                            <FlexRow key={id}>
                                {title}
                                <IconButton
                                    name='plus'
                                    onClick={async () => {
                                        if (!date || !type) return;
                                        const response = await addPlan({
                                            date,
                                            type,
                                            recipe_id: id
                                        });
                                        if (response.status !== Status.Created) {
                                            alert('Not successful!');
                                        } else {
                                            onClose();
                                        }
                                    }} />
                            </FlexRow>
                        ))
                }
            </Result>
        </Modal>
    );
}