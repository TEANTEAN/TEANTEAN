/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "styles/theme";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "next-auth/client";

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Head>
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
      />
    </Head>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </Provider>
);

export default App;
