import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ItemManager } from '../../../components/templates';
import { useRecipesContext } from '../../../hooks';
import { fetch } from '../../../util/api';
import { refreshAccessToken } from '../../../util/token';

type Props = {
    items: Item[];
    units: Unit[];
}

export default function ItemsPage({ items, units }: Props) {
    const { updateItems, updateUnits } = useRecipesContext();

    useEffect(() => {
        updateItems(items);
        updateUnits(units);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Head>
                <title>Smapp | Smart Meal Plan App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ItemManager />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: items } = await fetch.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500'}/items`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        const { data: units } = await fetch.get<Unit[]>(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500'}/units`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { items, units } };
    } catch (error) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
}