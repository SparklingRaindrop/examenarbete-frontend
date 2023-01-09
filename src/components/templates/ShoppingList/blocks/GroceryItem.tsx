import { ChangeEvent, useMemo } from 'react';
import { useGroceries } from '../../../../hooks';
import { Checkbox, Counter, IconButton, ListItem } from '../../../elements';

interface Props extends Grocery {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
}

export default function GroceryItem(props: Props) {
    const { id, toggleCheckbox, } = props;
    const { editItem, groceries } = useGroceries();
    const grocery = useMemo<Grocery | undefined>(() => groceries.find(item => item.id === id), [groceries, id]);

    if (!grocery) return <></>;
    const { amount, item_name, isChecked } = grocery;

    function updateCounterValue(value: number, action?: string): void {
        if (value < 0 && amount === 0) return;
        editItem(id as unknown as Pick<Grocery, 'id'>, {
            amount: action === 'replace' ? value : amount + value
        });
    }

    return (
        <ListItem>
            <Checkbox
                label={item_name || ' '}
                checked={isChecked}
                toggle={(event) => toggleCheckbox(event, id as unknown as Pick<Grocery, 'id'>)}
                crossOffOnChecked />
            <Counter
                value={amount}
                setCounterValue={updateCounterValue}
            />
            <IconButton name='delete' />
        </ListItem>
    );
}