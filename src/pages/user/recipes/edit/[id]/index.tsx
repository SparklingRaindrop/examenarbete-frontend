import { useRouter } from 'next/router';
import { RecipeEditor } from '../../../../../components/templates/Recipes/blocks';
import { RecipesContext } from '../../../../../context';

export default function PostPage() {
    const router = useRouter()
    const id = router.query.id as string;

    return (
        <RecipeEditor id={id} />
    );
}