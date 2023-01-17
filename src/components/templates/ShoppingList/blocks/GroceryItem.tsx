import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useGroceries } from '../../../../hooks';
import { Status } from '../../../../types/statusCode';
import { get, isGetResponse } from '../../../../util/api';
import { Checkbox, Icon } from '../../../elements';
import { TextContent, Wrapper } from './styled';

type Props = {
    id: string;
    setGroceries: Dispatch<SetStateAction<Grocery[]>>;
} & Grocery;

export default function GroceryItem(props: Props) {
    const { id, setGroceries, isChecked, item, unit, amount } = props;
    const { editItem } = useGroceries();

    async function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
        const { checked } = event.target;
        await editItem(id, {
            isChecked: checked
        });
        const response = await get<Grocery[]>('/groceries');
        if (response && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            setGroceries(data);
        }
    }

    return (
        <Wrapper>
            <Icon name='sixDots' />
            <Checkbox
                checked={isChecked || false}
                onChange={handleCheckbox} />
            <TextContent isChecked={isChecked || false}>
                <label>{item.name}</label>
                <div className='count'>{amount} {unit.name}</div>
            </TextContent>
        </Wrapper>
    );
}