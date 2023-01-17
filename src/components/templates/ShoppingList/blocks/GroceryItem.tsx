import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useGroceries } from '../../../../hooks';
import { Checkbox, Counter, IconButton, Input } from '../../../elements';
import { TextContent, Wrapper } from './styled';

interface Props extends Grocery {
    item: { name: string, id: string };
    unit: { name: string, id: string };
    amount: number;
    isChecked: boolean;
}

export default function GroceryItem(props: Props) {
    const { id, item, unit, amount, isChecked } = props;
    const { editItem } = useGroceries();

    function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
        const { checked } = event.target;
        editItem(id, {
            isChecked: checked
        });
    }

    return (
        <Wrapper>
            <Checkbox
                checked={isChecked}
                onChange={handleCheckbox} />
            <TextContent isChecked={isChecked}>
                <label>{item.name}</label>
                <div className='count'>{amount} {unit.name}</div>
            </TextContent>
        </Wrapper>
    );
}