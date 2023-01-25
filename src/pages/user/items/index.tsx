import axios from 'axios';
import { useEffect } from 'react';
import { ItemManager } from '../../../components/templates';
import { useRecipesContext } from '../../../hooks';

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

export async function getServerSideProps(context: any) {
    const { access_token } = context.req.cookies;
    const { data: items } = await axios.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    const { data: units } = await axios.get<Unit[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/units`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    return { props: { items, units } };
}