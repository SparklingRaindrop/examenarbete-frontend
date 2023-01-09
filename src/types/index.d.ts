interface Grocery {
    id: string;
    name: string;
    updated_at: Date;
    amount: number;
    item_id: string;
    isChecked: boolean;
}

type MediaQuery = 'xs' | 'sm' | 'md' | 'lg';
type FontSize = 'sm' | 'standard' | 'lg';
type PaddingVariation = 'sm' | 'md' | 'lg' | 'none';

interface CustomCSSProperties {
    py?: PaddingVariation;
    px?: PaddingVariation;
}

interface GeneralProps extends CustomCSSProperties, CSSProperties {
    children?: ReactNode;
}