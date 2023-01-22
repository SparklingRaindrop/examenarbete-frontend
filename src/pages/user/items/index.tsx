import { IconButton } from '../../../components';
import { useRecipesContext } from '../../../hooks';

type Props = {}
export default function ItemsPage({ }: Props) {
    const { items, removeItem } = useRecipesContext();

    return (
        <div>
            <ul>
                {
                    items.map(({ name, unit, id }) =>
                        <li key={id}>
                            {name} {unit.name}
                            <IconButton
                                name='pencil'
                                variant='ghost' />
                            <IconButton
                                name='xMark'
                                variant='ghost'
                                onClick={() => removeItem(id)} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}