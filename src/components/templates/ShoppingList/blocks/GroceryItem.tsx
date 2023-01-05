import { ChangeEvent } from 'react';
import { Checkbox, ListItem } from '../../../elements';

type Props = {
    id: string;
    checked: boolean;
    name: string;
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
}

export default function GroceryItem(props: Props) {
    const { id, checked, name, toggleCheckbox } = props;

    return (
        <ListItem>
            <Checkbox
                label={name}
                checked={checked}
                toggle={(event) => toggleCheckbox(event, id as unknown as Pick<Grocery, 'id'>)}
                crossOffOnChecked />
        </ListItem>
    );
}