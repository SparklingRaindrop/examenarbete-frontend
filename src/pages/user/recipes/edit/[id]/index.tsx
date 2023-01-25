import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../../../../../components';
import { RecipeEditor } from '../../../../../components/templates/Recipes';

export default function PostPage() {
    const router = useRouter();
    const id = router.query.id as string;

    return (
        <>
            <button>
                <Link href='/user/recipes'><Icon name='chevronLeft' />Back</Link>
            </button>
            <RecipeEditor id={id} />
        </>
    );
}