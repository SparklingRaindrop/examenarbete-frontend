import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useGroceries } from '../../../../hooks';
import { Status } from '../../../../types/statusCode';
import { get, isGetResponse } from '../../../../util/api';
import { Checkbox, Icon } from '../../../elements';
import { TextContent, Wrapper } from './styled';

type Props = {
    id: string;
    handleCheckbox: (event: ChangeEvent<HTMLInputElement>, id: string) => Promise<void>;
} & Grocery;

export default function GroceryItem(props: Props) {
    const { handleCheckbox, isChecked, item, unit, amount, id } = props;

    return (
        <Wrapper>
            <Icon name='sixDots' />
            <Checkbox
                checked={isChecked || false}
                onChange={(event) => handleCheckbox(event, id)} />
            <TextContent isChecked={isChecked || false}>
                <label>{item.name}</label>
                <div className='count'>{amount} {unit.name}</div>
            </TextContent>
        </Wrapper>
    );
}