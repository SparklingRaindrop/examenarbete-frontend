import axios from 'axios';
import { useEffect } from 'react';
import { Groceries } from '../../../components/templates';
import { useGroceriesContext } from '../../../hooks';

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

export async function getServerSideProps(context: any) {
    const { access_token } = context.req.cookies;
    const { data: groceries } = await axios.get<Grocery[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/groceries`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    return { props: { groceries } };
}