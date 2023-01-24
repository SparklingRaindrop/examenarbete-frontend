import { useRouter } from 'next/router';
import { useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { Button } from '../../elements';

import { RecipeList } from './blocks';
import SearchField from './blocks/SearchField/SearchField';
import { Container, H2 } from './styled';

export default function Recipes() {
    const [userInput, setUserInput] = useState<string>('');
    const { recipes } = useRecipesContext();
    const router = useRouter();

    return (
        <Container>
            <H2>
                My Recipes
            </H2>
            <Button
                label='Create new recipe'
                onClick={() => router.push('/user/recipes/new')} />
            <SearchField
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)} />
            <RecipeList filteredRecipes={userInput === '' ?
                [] :
                recipes.filter(({ title }) =>
                    title.toLowerCase().includes(userInput.toLowerCase()))
            } />
        </Container>
    );
}