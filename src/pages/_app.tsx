import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { RecipesProvider, ThemeProvider } from '../context';

import { Layout } from '../components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <RecipesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecipesProvider>
      </ThemeProvider></>
  );
}
