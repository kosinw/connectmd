import React from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.Component;
}): React.Component {
  return <Component {...pageProps} />;
}

export default MyApp;
