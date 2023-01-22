import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { IconButton, Input } from '../../elements';

import { RecipeList } from './blocks';

export default function Recipes() {
    const [userInput, setUserInput] = useState<string>('');
    const { recipes } = useRecipesContext();
    const router = useRouter();

    const filteredRecipes = userInput && recipes.filter(({ title }) => title.toLowerCase().includes(userInput.toLowerCase()));
    return (
        <>
            <h3>
                Search
            </h3>
            <Input
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)} />
            {
                (filteredRecipes && filteredRecipes.length > 0) &&
                <ul>
                    {
                        filteredRecipes.map(({ title, id }) => <li key={id}>{title}</li>)
                    }
                </ul>
            }
            <h3>
                My Recipes
            </h3>
            <IconButton
                name='plus'
                onClick={() => router.push('/user/recipes/new')} />
            <RecipeList />
        </>
    );
}