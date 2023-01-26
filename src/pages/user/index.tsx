import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { fetch } from '../../util/api';

export default function UserPage() {
    return (
        <div>
            <Link href='/user/shoppingList'>Shopping list</Link>
            <Link href='/user/items'>Edit items</Link>
        </div>
    );
}