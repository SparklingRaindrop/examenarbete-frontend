import Head from 'next/head';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGroceries } from '../../../hooks';
import { Status } from '../../../types/statusCode';
import { get, isGetResponse } from '../../../util/api';

import { Button, Icon } from '../../elements';
import GroceryInput from './blocks/GroceryInput';
import GroceryList from './blocks/GroceryList';
import GroupedButtons from './blocks/GroupedButtons';

export default function ShoppingList() {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { editItem } = useGroceries();

    useEffect(() => {
        async function init() {
            const response = await get<Grocery[]>('/groceries');
            if (response && response.status === Status.Succuss && isGetResponse(response)) {
                const { data } = response;
                setGroceries(data);
            }
        }
        init();
    }, []);


    function toggleInput(): void {
        setIsEditing(prev => !prev);
    }

    async function handleCheckbox(event: ChangeEvent<HTMLInputElement>, id: string) {
        const { checked } = event.target;
        await editItem(id, {
            isChecked: checked
        });
        const response = await get<Grocery[]>('/groceries');
        if (response && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            setGroceries(data);
        }
    }

    return (
        <>
            <Head>
                <title>Shopping List</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GroupedButtons />
            <GroceryList
                groceryList={groceries.filter(item => !item.isChecked)}
                handleCheckbox={handleCheckbox} />
            {isEditing && <GroceryInput toggle={toggleInput} handleCheckbox={handleCheckbox} />}
            <Button
                variant='ghost'
                onClick={() => setIsEditing(true)}>
                <Icon name='plus' />
                Add an Item
            </Button>
            <GroceryList
                groceryList={groceries.filter(item => item.isChecked)}
                handleCheckbox={handleCheckbox}
                isCheckedList />
        </>
    );
}