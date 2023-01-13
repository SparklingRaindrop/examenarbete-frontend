import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useGroceries } from '../../../../hooks';
import { Checkbox, Counter, IconButton, Input } from '../../../elements';
import { Wrapper } from './styled';

interface Props extends Grocery {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Grocery['id']) => void;
}

export default function GroceryItem(props: Props) {
    const { id, toggleCheckbox, } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { editItem, removeItem, groceries } = useGroceries();
    const grocery = useMemo<Grocery | undefined>(() => groceries.find(item => item.id === id), [groceries, id]);
    const item_name = useMemo<string>(() => grocery?.item_name || ' ', [grocery]);

    useEffect(() => {
        setInputValue(item_name);
    }, [item_name]);

    if (!grocery) return <></>;
    const { amount, isChecked } = grocery;

    function updateCounterValue(value: number, action?: string): void {
        if (value < 0 && amount === 0) return;
        editItem(id, {
            amount: action === 'replace' ? value : amount + value
        });
    }

    function updateItemName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setInputValue(event.target.value);
    }

    return (
        <Wrapper>
            <Checkbox
                checked={isChecked}
                toggle={(event) => toggleCheckbox(event, id)}
                crossOffOnChecked />
            {
                isEditing ?
                    <Input
                        value={inputValue}
                        variant='ghost'
                        onChange={updateItemName}
                        onBlur={async () => {
                            setIsEditing(false);
                            editItem(id, {
                                item_name: inputValue,
                            });
                        }}
                        autoFocus /> :
                    <label onClick={() => setIsEditing(true)}>{item_name || ' '}</label>
            }
            <Counter
                value={amount}
                setCounterValue={updateCounterValue}
            />
            <IconButton
                name='delete'
                onClick={() => removeItem(id)} />
        </Wrapper>
    );
}