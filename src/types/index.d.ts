interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

type Meal = 'breakfast' | 'lunch' | 'dinner';
interface Plan {
    id: string;
    recipe: Pick<Recipe, 'id' | 'title'>;
    date: Date;
    updated_at: Date;
    type: Meal;
}

interface Unit {
    id: string;
    name: string;
}

interface Item {
    id: string;
    name: string;
    unit: Unit;
    isDefault: boolean;
}

interface Grocery {
    id: string;
    updated_at: Date;
    amount: number;
    isChecked: boolean;
    item: Item;
}

interface Stock {
    id: string;
    item: Item;
    amount: number;
}

interface Instruction {
    id: string;
    step_no: number;
    instruction: string;
}

interface Recipe {
    id: string;
    title: string;
    ingredients: {
        amount: number;
        item: Item;
    }[];
    instructions: Instruction[];
}

type MediaQuery = 'sm' | 'md' | 'lg';
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