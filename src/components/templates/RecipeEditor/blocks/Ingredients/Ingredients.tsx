import { useRecipesContext } from '../../../../../hooks';
import { RecipeData } from '../../../../../hooks/useRecipesAPI';
import { Button, IconButton, ItemInputFields, ListItem } from '../../../../elements';
import { NewItem } from '../../../../elements/ItemInputFields/ItemInputFields';
import { Heading, Section } from '../styled';
import { ItemName, IngredientList, IngredientListItem, Amount } from './styled';

type Props = {
    isEditing: boolean;
    ingredients: RecipeData['ingredients'];
    addItem: (newItem: NewItem) => void;
    removeItem: (target: Pick<Item, 'id'>) => void;
    closeItemEditor: () => void;
    openItemEditor: () => void;
}

export default function Ingredients(props: Props) {
    const {
        isEditing,
        ingredients,
        addItem,
        closeItemEditor,
        openItemEditor,
        removeItem
    } = props;
    const { items } = useRecipesContext();

    const suggestions = items.filter(item =>
        !ingredients.some(ingredient => ingredient.item.id === item.id)
    );
    return (
        <Section>
            <Heading>
                ingredients
            </Heading>
            {
                ingredients.length > 0 &&
                <IngredientList>{ingredients.map(({ item, amount }, index) => (
                    <IngredientListItem key={item.id + index}>
                        <ItemName>{item.name}</ItemName>
                        <Amount>{amount}{item.unit.name}</Amount>
                        <IconButton
                            name='xMark'
                            variant='ghost'
                            onClick={() => removeItem({ id: item.id })} />
                    </IngredientListItem>
                ))}</IngredientList>
            }
            {
                isEditing &&
                <ItemInputFields
                    addItem={addItem}
                    onClose={closeItemEditor}
                    suggestions={suggestions} />
            }
            {
                !isEditing && (
                    <Button
                        label='add an item'
                        onClick={openItemEditor} />
                )}
        </Section>
    );
}