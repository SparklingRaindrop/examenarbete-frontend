import { ChangeEvent, useState } from 'react';
import { useGroceries } from '../../../../hooks';
import { Checkbox, Counter, ListItem } from '../../../elements';

interface Props extends Grocery {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
}

export default function GroceryItem(props: Props) {
    const {
        id,
        isChecked,
        item_name,
        amount,
        toggleCheckbox,
    } = props;
    const { editItem } = useGroceries();

    function updateCounterValue(value: number): void {
        if (value < 0 && amount === 0) return;
        editItem(id as unknown as Pick<Grocery, 'id'>, { amount: value });
    }

    return (
        <ListItem>
            <Checkbox
                label={item_name}
                checked={isChecked}
                toggle={(event) => toggleCheckbox(event, id as unknown as Pick<Grocery, 'id'>)}
                crossOffOnChecked />
            <Counter
                value={amount}
                setCounterValue={updateCounterValue}
            />
        </ListItem>
    );
}