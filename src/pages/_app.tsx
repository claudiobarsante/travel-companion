import { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
//import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { PlacesProvider } from 'context/usePlaces';
//import theme from '@styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <PlacesProvider>
        <Component {...pageProps} />
      </PlacesProvider>
      {/* </ThemeProvider> */}
    </>
  );
};

export default MyApp;
