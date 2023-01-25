import { useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { Button, Container } from '../../elements';
import { ItemEditor, ItemRow } from './blocks';
import { ItemList } from './styled';

export default function ItemManager() {
    const { items, units } = useRecipesContext();

    return (
        <Container>
            <ItemEditor />
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
