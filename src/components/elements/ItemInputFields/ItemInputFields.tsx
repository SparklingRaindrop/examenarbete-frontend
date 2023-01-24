import { useMemo, useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Group } from '../../templates/StockManager/blocks/StockItem/styled';
import { Autocomplete } from '../Autocomplete';
import { Button, IconButton } from '../Button';
import { Counter } from '../Counter';
import { Input } from '../Input';
import { Name, Row, Unit, Wrapper } from './styled';

export interface NewItem {
    item_id: Item['id'],
    amount: number;
}

type userInput = {
    name: string;
    amount: number;
}

type Props = {
    addItem: (newItem: NewItem) => void;
    onClose: () => void;
    suggestions: string[];
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose, suggestions } = props;
    const [userInput, setUserInput] = useState<userInput>({
        name: '',
        amount: 0,
    });
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const { items } = useRecipesContext();

    const item = items.find(item => item.name === userInput.name);
    return (
        <Wrapper>
            {
                isLocked ? (
                    <Name>{item && item?.name}</Name>
                ) : (
                    <Autocomplete
                        suggestions={suggestions}
                        userInput={userInput.name}
                        isLocked={isLocked}
                        setIsLocked={(value) => setIsLocked(value)}
                        updateUserInput={(value) => {
                            setUserInput(prev => ({
                                ...prev,
                                name: value
                            }));
                        }} />
                )
            }
            <Group>
                <Counter
                    value={userInput.amount}
                    onPlus={() => setUserInput(prev => ({
                        ...prev,
                        amount: prev.amount + 1,
                    }))}
                    onMinus={() => setUserInput(prev => ({
                        ...prev,
                        amount: prev.amount - 1,
                    }))}
                    onChange={(event) => {
                        setUserInput(prev => ({
                            ...prev,
                            amount: Number(event.target.value)
                        }));
                    }}
                    onBlur={() => { }} />
                <Unit>{item?.unit.name}</Unit> {/* Ignore new Item for now */}
            </Group>
            <Row>
                <Button
                    label='Add'
                    disabled={!isLocked || !item}
                    onClick={() => {
                        if (!item) return;
                        addItem({
                            item_id: item.id,
                            amount: userInput.amount,
                        });
                        onClose();
                    }} />
                <Button
                    label='cancel'
                    variant='secondary'
                    onClick={onClose} />
            </Row>
        </Wrapper>
    );
}