import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context';
import { AuthProvider } from '../context/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
