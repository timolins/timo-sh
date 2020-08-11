import "../assets/styles/main.css";
import "../assets/styles/prism.css";
import "react-notion/src/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
