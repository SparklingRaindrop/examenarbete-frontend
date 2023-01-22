import { ChangeEvent } from 'react';
import { useGroceriesContext } from '../../../../../hooks';
import { Checkbox, Icon } from '../../../../elements';
import { TextContent, Wrapper } from './styled';

type Props = {
    id: string;
} & Grocery;

export default function GroceryItem(props: Props) {
    const { isChecked, item, amount, id } = props;
    const { editItem } = useGroceriesContext();

    function handleCheckbox(event: ChangeEvent<HTMLInputElement>, id: string) {
        const { checked } = event.target;
        editItem(id, {
            isChecked: checked
        });
    }

    const { name, unit } = item;
    return (
        <Wrapper>
            <Icon name='sixDots' />
            <Checkbox
                checked={isChecked || false}
                onChange={(event) => handleCheckbox(event, id)} />
            <TextContent isChecked={isChecked || false}>
                <label>{name}</label>
                <div className='count'>{amount} {unit.name}</div>
            </TextContent>
        </Wrapper>
    );
}