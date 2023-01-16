import { Heebo } from '@next/font/google';
import { Header } from './Header';
const heebo = Heebo({
    variable: '--text-font',
});

export default function Layout(props: GeneralProps) {
    const { children } = props;
    return (
        <>
            <Header />
            <main className={heebo.variable}>{children}</main>
        </>
    );
}