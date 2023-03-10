import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
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
        <>
            <Head>
                <title>Smapp | Smart Meal Plan App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <MealPlans />
        </>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: plans } = await fetch.get<Plan[]>(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500'}/plans`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { plans } };
    } catch (error) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
}