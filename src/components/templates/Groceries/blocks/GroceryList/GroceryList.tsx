import { useDisclosure, useGroceriesContext } from '../../../../../hooks';

import { Icon, List } from '../../../../elements';
import { GroceryItem } from '../GroceryItem';
import { Wrapper } from './styled';

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
                        <Wrapper>No item</Wrapper>
                    )
                }
            </List>
            {
                checkedGroceryList.length > 0 && (
                    <>
                        <Wrapper onClick={toggleIsOpen}>
                            Marked Items
                            <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} />
                        </Wrapper>
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
