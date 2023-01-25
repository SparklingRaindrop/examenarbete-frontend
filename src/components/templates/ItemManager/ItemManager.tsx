import { useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { Button, Container } from '../../elements';
import { ItemEditor, ItemRow } from './blocks';
import { ItemList } from './styled';

export default function ItemManager() {
    const { items } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <Container>
            {
                !isEditing ?
                    <Button
                        label='add new item'
                        onClick={() => setIsEditing(true)} /> :
                    <ItemEditor onClose={() => setIsEditing(false)} />
            }
            <ItemList>
                {
                    items.map(item =>
                        <ItemRow key={item.id} {...item} />
                    )
                }
            </ItemList>
        </Container>
    );
}
