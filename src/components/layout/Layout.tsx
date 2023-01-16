import { Main } from '../elements';
import { Footer } from './Footer';
import { Header } from './Header';


export default function Layout(props: GeneralProps) {
    const { children } = props;
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>
    );
}