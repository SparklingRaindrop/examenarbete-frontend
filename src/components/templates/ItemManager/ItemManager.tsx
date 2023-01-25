import { useEffect, useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Button, Container } from '../../elements';
import { SingleItem } from './blocks';
import ItemEditor from './blocks/ItemEditor';
import ItemRow from './blocks/ItemRow';
import { ItemList } from './styled';

type Props = {}
export default function ItemManager({ }: Props) {
    const { items } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { getItems } = useRecipesContext();

    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, []);

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
