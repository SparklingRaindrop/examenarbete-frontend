import 'styled-components';

interface IPalette {
    main: string
    contrastText: string
}

type BorderSize = 'thin' | 'bold';
interface Border {
    size: Record<BorderSize, string>;
}

type FontSize = 'small' | 'medium' | 'large';
interface Font {
    size: Record<Fontsize, string>
}

declare module 'styled-components' {
    export interface DefaultTheme {
        border: Border;
        font: Font;
        borderRadius: string;
        palette: {
            common: {
                black: string;
                white: string;
            }
            primary: IPalette;
            secondary: IPalette;
        }
    }
}