import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import StockManager from '../../../components/templates/StockManager/StockManager';
import { useRecipesContext } from '../../../hooks';
import useStocksContext from '../../../hooks/useStocksContext';
import { fetch } from '../../../util/api';

type Props = {
    stocks: Stock[],
    items: Item[]
}

export default function StocksPage({ items, stocks }: Props) {
    const { updateStocks } = useStocksContext();
    const { updateItems } = useRecipesContext();

    useEffect(() => {
        updateStocks(stocks);
        updateItems(items);
        // eslint-disable-next-line
    }, []);
    return (
        <StockManager />
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: stocks } = await fetch.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/stocks`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie,
            }
        });
        const { data: items } = await fetch.get<Item[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { items, stocks } };
    } catch (error) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
}