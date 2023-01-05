import { ChangeEvent } from 'react';
import { List } from '../../../elements';
import GroceryItem from './GroceryItem';

type Props = {
    state: Grocery[];
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    crossed?: boolean;
}

export default function GroceryList(props: Props) {
    const { state, toggleCheckbox, crossed } = props;

    return (
        <List>
            {
                state.map(({ id, isChecked, name }) => {
                    if (crossed && !isChecked) return;
                    if (!crossed && isChecked) return;
                    return (
                        <GroceryItem
                            key={id}
                            id={id}
                            name={name}
                            checked={isChecked}
                            toggleCheckbox={toggleCheckbox}
                        />
                    );
                })
            }
        </List>
    );
}