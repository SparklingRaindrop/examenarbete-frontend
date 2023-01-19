import { useRecipesContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';

type Props = {
    recipes: Recipe[];
    updateRecipes: () => Promise<void>
}
export default function RecipeList(props: Props) {
    const { recipes, updateRecipes } = props;
    const { removeRecipe } = useRecipesContext();

    async function deleteRecipe(id: string) {
        return removeRecipe(id);
    }

    return (
        <ul>
            {
                recipes.map(({ id, title }) => (
                    <div key={id}>
                        <h3>{title}</h3>
                        <IconButton
                            variant='ghost'
                            name='pencil' />
                        <IconButton
                            variant='ghost'
                            name='delete'
                            onClick={() => (
                                deleteRecipe(id)
                                    .then(() => updateRecipes())
                            )} />
                    </div>
                ))
            }
        </ul>
    );
}