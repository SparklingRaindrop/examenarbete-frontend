import { useMemo } from 'react';
import { useGroceriesContext } from '../../../../../hooks';
import { Button, DropdownMenu } from '../../../../elements';
import { MenuItem } from '../../../../elements/DropdownMenu/DropdownMenu';
import { Flex } from './styled';

export default function GroupedButtons() {
    const { generateGroceries, removeAllGroceries, groceries } = useGroceriesContext();
    const hasMarkedItems = useMemo(() =>
        groceries.filter(({ isChecked }) => isChecked).length > 0
        , [groceries]
    );

    const menuContent: MenuItem[] = [{
        label: 'Remove marked',
        onClick: () => removeAllGroceries({ isChecked: true }),
        isDisabled: !hasMarkedItems,
    }, {
        label: 'clear all',
        onClick: () => removeAllGroceries(),
        isDisabled: groceries.length === 0,
    }];

    return (
        <Flex>
            <Button
                label='Generate from meal plan'
                onClick={() => generateGroceries()} />
            <DropdownMenu contents={menuContent} />
        </Flex>
    );
}