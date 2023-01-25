import { useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';
import ItemEditor from '../ItemEditor';
import { Buttons, Name, Unit, Wrapper } from './styled';

export default function ItemRow(props: Item) {
    const { unit, name, id } = props;
    const { removeItem } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>();

    return (
        <Wrapper>
            {isEditing ?
                <ItemEditor
                    {...props}
                    onClose={() => setIsEditing(false)} /> : (
                    <>
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