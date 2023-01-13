import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

import { useGroceriesContext } from '../../../hooks';
import { Status } from '../../../types/statusCode';
import { Button, Checkbox, Icon, Input, ListItem, Main } from '../../elements';
import GroceryList from './blocks/GroceryList';

export default function ShoppingList() {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>('');
    const value = useGroceriesContext();

    const { editItem, addItem } = value;

    function toggleCheckbox(event: ChangeEvent<HTMLInputElement>, id: Grocery['id']) {
        const checked = event.target.checked;
        editItem(id, { isChecked: checked });
    }

    function updateUserInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserInput(event.target.value);
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
                            <Input
                                value={userInput}
                                onChange={updateUserInput}
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
                                variant='ghost'
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