import { ChangeEvent, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { Status } from '../../../../../types/statusCode';
import { Button, Icon, Input } from '../../../../elements';
import { Box, Name, Option, UnitSelector, Wrapper } from './styled';

type Props = {
    onClose?: () => void;
}

export default function ItemEditor(props: Props & Partial<Item>) {
    const { name, unit, id, isDefault } = props;
    const [userInput, setUserInput] = useState({
        name: name ? name : '',
        unit_id: unit ? unit.id : '',
    });
    const { units, updateItem, createItem } = useRecipesContext();

    useEffect(() => {
        if (userInput.unit_id === '' && units.length > 0) {
            setUserInput(prev => ({
                ...prev,
                unit_id: units[0].id,
            }));
        }
    }, [units, userInput.unit_id]);

    function handleSelectOnChange(event: ChangeEvent<HTMLSelectElement>) {
        setUserInput(prev => ({
            ...prev,
            unit_id: event.target.value,
        }));
    }

    function resetUserInput(): void {
        setUserInput({
            name: '',
            unit_id: '',
        });
    }

    return (
        <Wrapper>
            <Box>
                {isDefault && <Icon name='warnBudge' title='default item' />}
                {
                    isDefault ? (
                        <Name title='default item'>{userInput.name}</Name>
                    ) : (
                        <Input
                            value={userInput.name}
                            onChange={(event) => setUserInput(prev => ({
                                ...prev,
                                name: event.target.value,
                            }))}
                            disabled={isDefault} />
                    )
                }
                <UnitSelector
                    name='units'
                    id='units-select'
                    value={userInput.unit_id ? userInput.unit_id : units[0]?.id}
                    onChange={handleSelectOnChange}>
                    {
                        units.map(({ id: unitId, name: unitName }) => (
                            <Option
                                key={unitId}
                                value={unitId}>
                                {unitName}
                            </Option>
                        ))
                    }
                </UnitSelector>
            </Box>
            <Box>
                <Button
                    label='add new item'
                    onClick={async () => {
                        if (id) {
                            const response = await updateItem(id, userInput);
                            if (response.status !== Status.BadRequest) {
                                resetUserInput();
                            }
                        } else if (!id && userInput.name) {
                            const response = await createItem(userInput);
                            if (response.status !== Status.BadRequest) {
                                resetUserInput();
                            }
                        }
                    }}
                    disabled={!id && !userInput.name} />
            </Box>
        </Wrapper>
    );
}