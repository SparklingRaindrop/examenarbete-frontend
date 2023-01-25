import { GetServerSidePropsContext } from 'next';
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

    return <ItemManager />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let { access_token, refresh_token } = context.req.cookies;
    if (!access_token && refresh_token) {
        access_token = await refreshAccessToken();
    }

    const { data: items } = await fetch.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
        withCredentials: true,
        headers: {
            Cookie: context.req.headers.cookie
        }
    });
    const { data: units } = await fetch.get<Unit[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/units`, {
        withCredentials: true,
        headers: {
            Cookie: context.req.headers.cookie
        }
    });
    return { props: { items, units } };
}