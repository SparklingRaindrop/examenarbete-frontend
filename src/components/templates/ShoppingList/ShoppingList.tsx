import Head from 'next/head';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useGroceriesContext } from '../../../hooks';
import { Status } from '../../../types/statusCode';
import { Button, Checkbox, Icon, List, ListItem, Loading, Main } from '../../elements';
import GroceryList from './blocks/GroceryList';

export default function ShoppingList() {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>('');
    const value = useGroceriesContext();
    if (!value) {
        return <Loading />;
    }

    const { editItem, addItem } = value;

    function toggleCheckbox(event: ChangeEvent<HTMLInputElement>, id: Pick<Grocery, 'id'>) {
        const checked = event.target.checked;
        editItem(id, { isChecked: checked });
    }

    return (
        <>
            <Head>
                <title>Shopping List</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Button label='Generate' />
                <GroceryList toggleCheckbox={toggleCheckbox} />
                {
                    isEditing && (
                        <ListItem>
                            <Checkbox checked={false} />
                            <input
                                type='text'
                                value={userInput}
                                onChange={(event) => setUserInput(event.target.value)}
                                onBlur={async () => {
                                    const { status } = await addItem({
                                        item_name: userInput,
                                        updated_at: new Date(),
                                        amount: 0,
                                        item_id: '1',
                                        isChecked: false,
                                    });
                                    if (status === Status.Created) {
                                        setUserInput('');
                                        setIsEditing(false);
                                    }
                                }}
                                autoFocus />
                        </ListItem>
                    )
                }
                <Button
                    variant='ghost'
                    onClick={() => setIsEditing(true)}>
                    <Icon name='plus' />
                    Add an Item
                </Button>
                <GroceryList toggleCheckbox={toggleCheckbox} crossed />
            </Main>
        </>
    );
}