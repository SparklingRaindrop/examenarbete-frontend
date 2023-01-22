import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';

export default function SingleItem(props: Item) {
    const { unit, name, id } = props;
    const { items, removeItem } = useRecipesContext();

    return (
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