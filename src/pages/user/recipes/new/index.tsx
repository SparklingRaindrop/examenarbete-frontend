import { useRouter } from 'next/router';
import { Button, Container, Icon } from '../../../../components';
import { RecipeEditor } from '../../../../components/templates';

export default function PostPage() {
    const router = useRouter();

    return (
        <Container>
            <Button
                variant='ghost'
                onClick={() => router.push('/user/recipes')}>
                <Icon name='chevronLeft' />Back
            </Button>
            <RecipeEditor />
        </Container>
    );
}