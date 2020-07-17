import "../assets/styles/main.css";
import "react-notion/src/styles.css";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
