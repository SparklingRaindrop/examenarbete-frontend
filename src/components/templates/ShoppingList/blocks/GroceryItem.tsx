import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useGroceries } from '../../../../hooks';
import { Checkbox, Counter, ListItem } from '../../../elements';

interface Props extends Grocery {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
}

export default function GroceryItem(props: Props) {
    const {
        id,
        isChecked,
        name,
        amount,
        toggleCheckbox,
    } = props;
    const [count, setCount] = useState(amount);
    const value = useGroceries();
    const editItem = useCallback((newData: Partial<Grocery>) =>
        value.editItem(newData, id as unknown as Pick<Grocery, 'id'>)
        , [value, id]);

    useEffect(() => {
        editItem({ amount: count });
    }, [count, editItem]);

    return (
        <ListItem>
            <Checkbox
                label={name}
                checked={isChecked}
                toggle={(event) => toggleCheckbox(event, id as unknown as Pick<Grocery, 'id'>)}
                crossOffOnChecked />
            <Counter
                value={count}
                setCounterValue={setCount}
                disabled={count === 0}
            />
        </ListItem>
    );
}