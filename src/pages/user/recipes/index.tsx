import { Recipes } from '../../../components/templates';
import { RecipesProvider } from '../../../context';

export default function RecipePage() {
    return (
        <RecipesProvider>
            <Recipes />
        </RecipesProvider>
    );
}