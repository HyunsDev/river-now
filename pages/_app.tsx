import { Flip, ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { FooterPositionContextProvider } from "../hook/useFooter/footerPositionContext";
import { MapContextProvider } from "../hook/useMap/mapContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MapContextProvider>
          <FooterPositionContextProvider>
            <Component {...pageProps} />
          </FooterPositionContextProvider>
        </MapContextProvider>

        <ReactQueryDevtools initialIsOpen={true} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          transition={Flip}
        />
      </QueryClientProvider>
    </>
  );
}
