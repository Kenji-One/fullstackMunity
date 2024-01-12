import * as React from "react";
import "../app/globals.css";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../utils/store";
import { Web3ContextProvider } from "../utils";
import App from "@/components/layout/App";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Web3ContextProvider>
        <App>
          <Component {...pageProps} />
        </App>
      </Web3ContextProvider>
    </Provider>
  );
};

export default MyApp;
