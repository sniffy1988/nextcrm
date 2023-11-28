import { CustomerProvider } from "../app/context/CustomerContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomerProvider>
      <Component {...pageProps} />
    </CustomerProvider>
  );
}

export default MyApp;
