import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { MealPlans } from '../../../components/templates';
import { useMealPlansContext } from '../../../hooks';
import { fetch } from '../../../util/api';

type Props = {
    plans: Plan[];
}
export default function MealPlanPage({ plans }: Props) {
    const { updatePlans } = useMealPlansContext();

    useEffect(() => {
        updatePlans(plans);
        // eslint-disable-next-line
    }, []);

    return (
        <MealPlans />
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: plans } = await fetch.get<Plan[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/plans`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { plans } };
    } catch (error) {
        if (error instanceof Error && error.message === 'No token. Redirecting...') {
            return {
                redirect: {
                    destination: '/login'
                }
            };
        }
    }
    return;
}