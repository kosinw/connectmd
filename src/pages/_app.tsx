import Head from "next/head";
import Router from "next/router";
import nprogress from "nprogress";

import { ProvideAuth } from "hooks/firebase";
import { ChakraProvider } from "@chakra-ui/core";

import { theme } from "theme";

import "nprogress/nprogress.css";
import "styles/index.css";
import "styles/nprogress.css";

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ConnectMD &#8211; Connecting doctors around the world.</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
        />
      </Head>
      <ProvideAuth>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ProvideAuth>
    </>
  );
}

export default App;
