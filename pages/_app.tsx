import '../styles/globals.css'; // Import the global CSS
import type { AppProps } from 'next/app'; // Import the AppProps type

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
