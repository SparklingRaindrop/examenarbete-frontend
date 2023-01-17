import { useDisclosure } from '../../../../hooks';

import { Icon, List } from '../../../elements';
import GroceryItem from './GroceryItem';
import { Wrapper } from './styled';

type Props = {
    isCheckedList?: boolean;
    groceryList: Grocery[];
}

export default function GroceryList(props: Props) {
    const { isCheckedList, groceryList } = props;
    const { isOpen, toggleIsOpen } = useDisclosure();

    return (
        <List>
            {
                isCheckedList && (
                    <Wrapper onClick={toggleIsOpen}>
                        Marked Items
                        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} />
                    </Wrapper>
                )
            }
            {
                ((isCheckedList && isOpen) || (!isCheckedList)) && groceryList.map((grocery) => (
                    <GroceryItem
                        key={grocery.id}
                        {...grocery} />
                ))
            }
        </List>
    );
}