import { RecipeData } from '../../../../../../hooks/useRecipesAPI';
import { Button, ItemInputFields } from '../../../../../elements';
import { NewItem } from '../../../../../elements/ItemInputFields/ItemInputFields';
import { Heading } from '../styled';

type Props = {
    isEditing: boolean;
    ingredients: RecipeData['ingredients'];
    addItem: (newItem: NewItem) => void;
    closeItemEditor: () => void;
    openItemEditor: () => void;
}

export default function Ingredients(props: Props) {
    const { isEditing, ingredients, addItem, closeItemEditor, openItemEditor } = props;

    return (
        <>

            <Heading>
                ingredients
            </Heading>
            {
                ingredients.length > 0 && ingredients.map(({ item, amount }, index) => (
                    <li key={item.id + index}>
                        {item.name}
                        {amount}
                        {item.unit.name}
                    </li>
                ))
            }
            {
                isEditing &&
                <ItemInputFields
                    addItem={addItem}
                    onClose={closeItemEditor}
                    suggestions={[]} />
            }
            <Button
                label='add an item'
                onClick={openItemEditor} />
        </>
    );
}