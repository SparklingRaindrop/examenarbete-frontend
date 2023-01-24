import { ChangeEvent } from 'react';
import { useGroceriesContext } from '../../../../../hooks';
import { Checkbox, Icon, ListItem } from '../../../../elements';
import { TextContent } from './styled';

type Props = {
    id: string;
} & Grocery;

export default function GroceryItem(props: Props) {
    const { isChecked, item, amount, id } = props;
    const { updateGrocery } = useGroceriesContext();

    function handleCheckbox(event: ChangeEvent<HTMLInputElement>, id: string) {
        const { checked } = event.target;
        updateGrocery(id, {
            isChecked: checked
        });
    }

    const { name, unit } = item;
    return (
        <ListItem>
            <Icon name='sixDots' />
            <Checkbox
                checked={isChecked || false}
                onChange={(event) => handleCheckbox(event, id)} />
            <TextContent isChecked={isChecked || false}>
                <label>{name}</label>
                <div className='count'>{amount} {unit.name}</div>
            </TextContent>
        </ListItem>
    );
}