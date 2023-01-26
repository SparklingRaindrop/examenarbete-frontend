import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Container } from '../../elements';
import { Bigger, Box, H2, Explanation, Wrapper } from './styled';

type Content = {
    path: string,
    label: string,
    text: ReactElement,
}

export default function Dashboard() {
    const router = useRouter();
    const CONTENTS: Content[] = [{
        path: '/user/plans',
        label: 'Meal Plan',
        text: <><Bigger>See</Bigger> or < Bigger > Create</Bigger > Meal plans</>,
    }, {
        path: '/user/stock',
        label: 'Stock Manager',
        text: <><Bigger>Track</Bigger> your food stock</>,
    }, {
        path: '/user/recipes',
        label: 'My Recipes',
        text: <><Bigger>Create</Bigger> recipes</>,
    }, {
        path: '/user/groceries',
        label: 'Groceries',
        text: <><Bigger>generate</Bigger> shopping list</>,
    }];

    return (
        <Container>
            <Wrapper>
                {
                    CONTENTS.map(({ path, label, text }) => (
                        <Box key={path} onClick={() => router.push(path)}>
                            <H2>{label}</H2>
                            <Explanation>{text}</Explanation>
                        </Box>
                    ))
                }
            </Wrapper>
        </Container>
    );
}