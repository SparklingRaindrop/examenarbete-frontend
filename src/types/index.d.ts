interface Grocery {
    id: string;
    name: string;
    updated_at: Date;
    amount: number;
    item_id: string;
    isChecked: boolean;
}
interface CustomCSSProperties {
    paddingY: string;
    paddingX: string;
}

interface CSSProperties extends CustomCSSProperties { }