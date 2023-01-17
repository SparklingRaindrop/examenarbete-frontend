import { useDisclosure, useGroceriesContext } from '../../../../hooks';
import { Icon, List } from '../../../elements';
import GroceryItem from './GroceryItem';
import { Wrapper } from './styled';

type Props = {
    isCheckedList?: boolean;
}

export default function GroceryList(props: Props) {
    const { isCheckedList } = props;
    const { isOpen, toggleIsOpen } = useDisclosure();
    const { groceries } = useGroceriesContext();

    return (
        <List>
            {
                isCheckedList && (
                    <Wrapper onClick={() => toggleIsOpen()}>
                        Marked Items
                        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} />
                    </Wrapper>
                )
            }
            {
                groceries.map(grocery => {
                    const { id, isChecked } = grocery;

                    if (isOpen && isCheckedList && isChecked) {
                        return <GroceryItem key={id} {...grocery} />;
                    } else if (!isCheckedList && !isChecked) {
                        return <GroceryItem key={id} {...grocery} />;
                    }
                    return;
                })
            }
        </List>
    );
}