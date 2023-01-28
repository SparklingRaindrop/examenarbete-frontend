import { useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { Icon, IconButton } from '../../../../elements';
import ItemEditor from '../ItemEditor';
import { Buttons, Name, Unit, Wrapper } from './styled';

export default function ItemRow(props: Item) {
    const { unit, name, id, isDefault } = props;
    const { removeItem } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>();

    return (
        <Wrapper>
            {isEditing ?
                <ItemEditor
                    {...props}
                    label='Update'
                    onClose={() => setIsEditing(false)} /> : (
                    <>
                        {isDefault && <Icon name='warnBudge' title='default item' />}
                        <Name>{name}</Name>
                        <Unit>{unit.name} </Unit>
                        <Buttons>
                            <IconButton
                                name='pencil'
                                variant='ghost'
                                onClick={() => setIsEditing(true)} />
                            <IconButton
                                name='xMark'
                                variant='ghost'
                                onClick={() => removeItem(id)} />
                        </Buttons>
                    </>
                )}
        </Wrapper>
    );
}