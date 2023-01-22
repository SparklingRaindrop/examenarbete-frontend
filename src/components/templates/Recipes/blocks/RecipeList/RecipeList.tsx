import { useRouter } from 'next/router';
import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';

export default function RecipeList() {
    const { recipes } = useRecipesContext();
    const { removeRecipe } = useRecipesContext();
    const router = useRouter();

    return (
        <ul>
            {
                recipes.map(({ id, title }) => (
                    <div key={id}>
                        <h3>{title}</h3>
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
                    </div>
                ))
            }
        </ul>
    );
}