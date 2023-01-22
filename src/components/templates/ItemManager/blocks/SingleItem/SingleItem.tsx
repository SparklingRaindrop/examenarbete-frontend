import { useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';
import ItemEditor from '../ItemEditor';
import { Wrapper } from './styled';

export default function SingleItem(props: Item) {
    const { unit, name, id } = props;
    const { removeItem } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>();

    return (
        <Wrapper key={id}>
            {isEditing ?
                <ItemEditor
                    {...props}
                    onClose={() => setIsEditing(false)} /> : (
                    <>
                        {name} {unit.name}
                        <IconButton
                            name='pencil'
                            variant='ghost'
                            onClick={() => setIsEditing(true)} />
                        <IconButton
                            name='xMark'
                            variant='ghost'
                            onClick={() => removeItem(id)} />
                    </>
                )}
        </Wrapper>
    );
}