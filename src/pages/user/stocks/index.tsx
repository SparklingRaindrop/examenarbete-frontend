import axios from 'axios';
import { useEffect } from 'react';
import StockManager from '../../../components/templates/StockManager/StockManager';
import { useRecipesContext } from '../../../hooks';
import useStocksContext from '../../../hooks/useStocksContext';

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

export async function getServerSideProps(context: any) {
    const { access_token } = context.req.cookies;
    const { data: stocks } = await axios.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/stocks`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    const { data: items } = await axios.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    return { props: { items, stocks } };
}