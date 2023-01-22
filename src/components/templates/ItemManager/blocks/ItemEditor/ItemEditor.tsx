import { ChangeEvent, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { Button } from '../../../../elements';

type Props = {
    onClose: () => void;
}

export default function ItemEditor(props: Partial<Item> & Props) {
    const { name, unit, id, isDefault, onClose } = props;
    const [userInput, setUserInput] = useState({
        name: name ? name : '',
        unit_id: unit ? unit.id : '',
    });
    const { units, updateItem, createItem } = useRecipesContext();

    useEffect(() => {
        if (userInput.unit_id === '') {
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

    return (
        <div>
            <input
                value={userInput.name}
                onChange={(event) => setUserInput(prev => ({
                    ...prev,
                    name: event.target.value,
                }))}
                disabled={isDefault} />
            <select
                name='units'
                id='units-select'
                value={userInput.unit_id ? userInput.unit_id : units[0].id}
                onChange={handleSelectOnChange}>
                {
                    units.map(({ id: unitId, name: unitName }) => (
                        <option key={unitId} value={unitId}>
                            {unitName}
                        </option>
                    ))
                }
            </select>
            <Button
                label='save'
                onClick={() => {
                    if (id) {
                        updateItem(id, userInput);
                        onClose();
                    } else if (!id && userInput.name) {
                        createItem(userInput);
                        onClose();
                    }
                }}
                disabled={!id && !userInput.name} />
            <Button
                label='cancel'
                variant='secondary'
                onClick={() => {
                    onClose();
                }} />
        </div>
    );
}