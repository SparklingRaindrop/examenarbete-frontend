import { useDisclosure, useGroceriesContext } from '../../../../../hooks';

import { Icon, List } from '../../../../elements';
import { GroceryItem } from '../GroceryItem';
import { Wrapper } from './styled';

type Props = {
    isCheckedList?: boolean;
}

export default function GroceryList(props: Props) {
    const { isCheckedList } = props;
    const { isOpen, toggleIsOpen } = useDisclosure();
    const { groceries } = useGroceriesContext();

    const groceryList = groceries.filter(item =>
        isCheckedList ? item.isChecked : !item.isChecked
    );

    if (isCheckedList) {
        return (
            <List>
                {
                    groceryList.length > 0 && (
                        <Wrapper onClick={toggleIsOpen}>
                            Marked Items
                            <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} />
                        </Wrapper>
                    )
                }
            </List>
        );
    } else {
        return (
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
        );
    }
}