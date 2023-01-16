import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '../context';

import { Layout } from '../components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider></>
  );
}
