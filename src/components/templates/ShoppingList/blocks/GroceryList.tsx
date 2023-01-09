import { ChangeEvent } from 'react';
import { useGroceriesContext } from '../../../../hooks';
import { List, Loading } from '../../../elements';
import GroceryItem from './GroceryItem';

type Props = {
    toggleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) => void;
    crossed?: boolean;
}

export default function GroceryList(props: Props) {
    const { toggleCheckbox, crossed } = props;
    const value = useGroceriesContext();

    return (
        <List py='none'>
            {
                value.groceries.map(grocery => {
                    if (crossed && !grocery.isChecked) return;
                    if (!crossed && grocery.isChecked) return;
                    return (
                        <GroceryItem
                            key={grocery.id}
                            {...grocery}
                            toggleCheckbox={toggleCheckbox}
                        />
                    );
                })

            }
        </List>
    );
}