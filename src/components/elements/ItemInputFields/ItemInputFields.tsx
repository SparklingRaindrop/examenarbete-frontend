import { useMemo, useReducer, useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Group } from '../../templates/StockManager/blocks/StockItem/styled';
import { Autocomplete } from '../Autocomplete';
import { Button, IconButton } from '../Button';
import { Counter } from '../Counter';
import { Input } from '../Input';
import { Name, Row, Unit, Wrapper } from './styled';

export interface NewItem {
    item_id: Item['id'],
    amount: number;
}

type Props = {
    addItem: (newItem: NewItem) => void;
    onClose: () => void;
    suggestions: Item[];
}

type ReducerState = {
    selectedItem: Item | undefined;
    amount: number;
    isLocked: boolean;
}

const initialValue = {
    selectedItem: undefined,
    amount: 0,
    isLocked: false,
};

function reducer(state: ReducerState, action: { type: string, value?: any }): ReducerState {
    const { type, value } = action;
    if (type === 'update_item') {
        return {
            ...state,
            selectedItem: value,
        };
    } else if (type === 'update_isLocked') {
        return {
            ...state,
            isLocked: value,
        };
    } else if (type === 'update_amount') {
        return {
            ...state,
            amount: value,
        };
    } else if (type === 'increase_amount') {
        return {
            ...state,
            amount: state.amount + 1,
        };
    } else if (type === 'decrease_amount') {
        return {
            ...state,
            amount: state.amount - 1,
        };
    }
    return state;
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose, suggestions } = props;
    const [state, dispatch] = useReducer(reducer, initialValue);
    const { items } = useRecipesContext();

    function updateSelectedItem(newItem: Item) {
        dispatch({
            type: 'update_item',
            value: newItem,
        });
    }

    function updateIsLocked(value: boolean) {
        dispatch({
            type: 'update_isLocked',
            value,
        });
    }

    function updateAmount(value: number) {
        dispatch({
            type: 'update_amount',
            value: value,
        });
    }

    const { isLocked, amount, selectedItem } = state;
    const item = items.find(item => item.id === selectedItem?.id);

    return (
        <Wrapper>
            {
                isLocked ? (
                    <Name>{item && item?.name}</Name>
                ) : (
                    <Autocomplete
                        suggestions={suggestions}
                        isLocked={isLocked}
                        setIsLocked={updateIsLocked}
                        updateSelectedItem={updateSelectedItem} />
                )
            }
            <Group>
                <Counter
                    value={amount}
                    onPlus={() => dispatch({ type: 'increase_amount' })}
                    onMinus={() => dispatch({ type: 'decrease_amount' })}
                    onChange={(event) => updateAmount(Number(event.target.value))}
                    onBlur={() => { }} />
                <Unit>{item?.unit.name}</Unit> {/* Ignore new Item for now */}
            </Group>
            <Row>
                <Button
                    label='Add'
                    disabled={!isLocked || !selectedItem}
                    onClick={() => {
                        if (!selectedItem) return;
                        addItem({
                            amount,
                            item_id: selectedItem.id
                        });
                        onClose();
                    }} />
                <Button
                    label='cancel'
                    variant='secondary'
                    onClick={onClose} />
            </Row>
        </Wrapper>
    );
}