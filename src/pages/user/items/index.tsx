import { useEffect } from 'react';
import { ItemManager } from '../../../components/templates';
import { useRecipesContext } from '../../../hooks';

type Props = {}
export default function ItemsPage({ }: Props) {
    const { getItems, getUnits } = useRecipesContext();

    useEffect(() => {
        getItems();
        getUnits();
        // eslint-disable-next-line
    }, []);

    return <ItemManager />;
}