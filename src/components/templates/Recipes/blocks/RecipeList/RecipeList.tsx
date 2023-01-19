import { useRouter } from 'next/router';
import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';

type Props = {
    recipes: Recipe[];
    updateRecipes: () => Promise<void>
}
export default function RecipeList(props: Props) {
    const { recipes, updateRecipes } = props;
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
                            onClick={() => (
                                removeRecipe(id)
                                    .then(() => updateRecipes())
                            )} />
                    </div>
                ))
            }
        </ul>
    );
}