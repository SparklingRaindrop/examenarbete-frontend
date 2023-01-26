import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { Groceries } from '../../../components/templates';
import { useGroceriesContext } from '../../../hooks';
import { fetch } from '../../../util/api';
import { refreshAccessToken } from '../../../util/token';

type Props = {
    groceries: Grocery[];
}

export default function Grocery({ groceries }: Props) {
    const { updateGroceries } = useGroceriesContext();

    useEffect(() => {
        updateGroceries(groceries);
        // eslint-disable-next-line
    }, []);

    return (
        <Groceries />
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: groceries } = await fetch.get<Grocery[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/groceries`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { groceries } };
    } catch (error) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
}