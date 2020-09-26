import Head from "next/head";
import Router from "next/router";

import nprogress from "nprogress";

import "nprogress/nprogress.css";
import "styles/index.css";
import "styles/nprogress.css";

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ConnectMD &#8211; Connecting doctors around the world.</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default Application;
