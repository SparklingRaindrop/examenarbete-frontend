import { useRouter } from 'next/router';

import { useRecipesContext } from '../../../../../../hooks';

import { IconButton } from '../../../../../elements';
import { List, ListItem, Title } from './styled';

type Props = {
    filteredRecipes: Recipe[];
}
export default function RecipeList(props: Props) {
    const { filteredRecipes } = props;
    const { removeRecipe } = useRecipesContext();
    const router = useRouter();

    return (
        <List>
            {
                filteredRecipes.map(({ id, title }) => (
                    <ListItem key={id}>
                        <Title>{title}</Title>
                        <IconButton
                            variant='ghost'
                            name='pencil'
                            onClick={() => {
                                router.push(`/user/recipes/edit/${id}`);
                            }} />
                        <IconButton
                            variant='ghost'
                            name='delete'
                            onClick={() => removeRecipe(id)} />
                    </ListItem>
                ))
            }
        </List>
    );
}