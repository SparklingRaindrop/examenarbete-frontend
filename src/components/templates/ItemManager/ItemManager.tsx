import { useRecipesContext } from '../../../hooks';

import { Container } from '../../elements';
import { ItemEditor, ItemRow } from './blocks';
import { ItemList } from './styled';

export default function ItemManager() {
    const { items } = useRecipesContext();

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
