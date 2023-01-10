interface Grocery {
    id: string;
    item_name: string;
    updated_at: Date;
    amount: number;
    item_id: string;
    isChecked: boolean;
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