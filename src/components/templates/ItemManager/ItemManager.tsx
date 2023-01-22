import { useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Button } from '../../elements';
import { SingleItem } from './blocks';
import ItemEditor from './blocks/ItemEditor';

type Props = {}
export default function ItemManager({ }: Props) {
    const { items } = useRecipesContext();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <div>
            <ul>
                {
                    items.map(item =>
                        <SingleItem key={item.id} {...item} />
                    )
                }
            </ul>
            {
                !isEditing ?
                    <Button
                        label='add new item'
                        onClick={() => setIsEditing(true)} /> :
                    <ItemEditor onClose={() => setIsEditing(false)} />
            }
        </div>
    )
}