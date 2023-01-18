interface Grocery {
    id: string;
    updated_at: Date;
    amount: number;
    isChecked: boolean;
    item: Pick<Item, 'id' | 'name'>;
    unit: Pick<Item, 'id' | 'name'>;
}

type Meal = 'breakfast' | 'lunch' | 'dinner';
interface Plan {
    id: string;
    recipe: Pick<Recipe, 'id' | 'title'>;
    date: Date;
    updated_at: Date;
    type: Meal;
}

interface Recipe {
    id: string;
    title: string;
}
interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

type MediaQuery = 'xs' | 'sm' | 'md' | 'lg';
type FontSize = 'sm' | 'standard' | 'lg';
type PaddingVariation = 'sm' | 'md' | 'lg' | 'none';
interface GapVariation extends PaddingVariation { };
interface CustomCSSProperties {
    py?: PaddingVariation;
    px?: PaddingVariation;
    gap?: GapVariation;
}

interface GeneralProps extends CustomCSSProperties {
    children?: React.ReactNode;
}