import Head from "next/head";
import "styles/index.css";

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
