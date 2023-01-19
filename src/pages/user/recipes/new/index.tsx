import Link from 'next/link';
import { Icon } from '../../../../components';
import { RecipeEditor } from '../../../../components/templates/Recipes/blocks';

export default function PostPage() {

    return (
        <>
            <button>
                <Link href='/user/recipes'><Icon name='chevronLeft' />Back</Link>
            </button>
            <RecipeEditor />
        </>
    );
}

// Set up create new recipe first