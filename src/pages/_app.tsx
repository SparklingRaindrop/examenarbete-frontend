import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { GroceriesProvider, MealPlansProvider, RecipesProvider, ThemeProvider } from '../context';

import { Layout } from '../components';
import { StocksProvider } from '../context/StocksProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <StocksProvider>
          <RecipesProvider>
            <GroceriesProvider>
              <MealPlansProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MealPlansProvider>
            </GroceriesProvider>
          </RecipesProvider>
        </StocksProvider>
      </ThemeProvider></>
  );
}
