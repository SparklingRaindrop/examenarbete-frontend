import { useDisclosure, useGroceriesContext } from '../../../../../hooks';

import { Icon, List } from '../../../../elements';
import { GroceryItem } from '../GroceryItem';
import { LabelButton, ListItem } from './styled';

export default function GroceryList() {
    const { isOpen, toggleIsOpen } = useDisclosure();
    const { groceries } = useGroceriesContext();

    const checkedGroceryList = groceries.filter(item => item.isChecked);
    const groceryList = groceries.filter(item => !item.isChecked);
    return (
        <>
            <List>
                {
                    groceryList.length > 0 ? (
                        groceryList.map((grocery) => (
                            <GroceryItem
                                key={grocery.id}
                                {...grocery} />
                        ))) : (
                        <ListItem>No item</ListItem>
                    )
                }
            </List>
            {
                checkedGroceryList.length > 0 && (
                    <>
                        <LabelButton onClick={toggleIsOpen}>
                            Marked Items
                            <Icon name={isOpen ? 'chevronDown' : 'chevronUp'} />
                        </LabelButton>
                        {
                            isOpen && (
                                <List>
                                    {
                                        checkedGroceryList.map((grocery) => (
                                            <GroceryItem
                                                key={grocery.id}
                                                {...grocery} />
                                        ))
                                    }
                                </List>
                            )
                        }
                    </>
                )
            }
        </>
    );
}
