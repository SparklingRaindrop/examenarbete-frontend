import { useRecipesContext } from '../../../hooks';
import { SingleItem } from './blocks';

type Props = {}
export default function ItemManager({ }: Props) {
    const { items } = useRecipesContext();

    return (
        <div>
            <ul>
                {
                    items.map(item =>
                        <SingleItem key={item.id} {...item} />
                    )
                }
            </ul>
        </div>
    )
}