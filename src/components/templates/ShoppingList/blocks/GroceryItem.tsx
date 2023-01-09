import { ChangeEvent, useState } from 'react';
import { Checkbox, Counter, ListItem } from '../../../elements';

interface Props extends Grocery {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
}

export default function GroceryItem(props: Props) {
    const { id, isChecked, name, toggleCheckbox, amount } = props;
    const [count, setCount] = useState(amount);

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
            />
        </ListItem>
    );
}