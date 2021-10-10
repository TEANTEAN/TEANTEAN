/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {Box, Typography} from "@material-ui/core";
import { AppProps, AppContext } from "next/app";
import Head from "next/head";
import theme from "styles/theme";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import useHasMounted from "util/hooks/useHasMounted";
import AdminNavigation from "components/AdminNavigation";
import withAuth from "util/hooks/withAuth";
import PublicNavigation from "components/PublicNavigation";
import { SnackbarProvider } from "notistack";

/*************************** Constants ***************************************/

const ADMIN_ROLE_NAME = "Genyus Admin";
const RESEARCHER_ROLE_NAME = "Research Partner";

/*****************************************************************************/

const queryClient = new QueryClient();

const AppWrapper = ({ Component, pageProps }) => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const { session, haveAuthenticated } = withAuth();

  // Our application hasn't mounted yet so we don't know who's trying to access what pages
  // Safest is to render nothing
  if (!hasMounted) {
    return null;
  }

  // Login page doesn't need navigation
  if (router.pathname.includes("/login"))
    return <Component {...pageProps} key={router.asPath} />;

  // admin path
  if (router.pathname.includes("/admin")) {
    // logind in
    if (haveAuthenticated() && session.user.role == ADMIN_ROLE_NAME) {
      return (
        <AdminNavigation>
          <Component {...pageProps} />
        </AdminNavigation>
      );
    }
    return (
      <PublicNavigation>
        <Typography variant="h5" align="center"> You don't have the previlege to access this page </Typography>
      </PublicNavigation>
    );
  }

  // researcher path
  if (router.pathname.includes("/research")) {
    if (haveAuthenticated() && session.user.role == RESEARCHER_ROLE_NAME) {
      return (
        <AdminNavigation>
          <h1> Researcher </h1>
        </AdminNavigation>
      );
    }
    return (
      <PublicNavigation>
        <Typography variant="h5" align="center"> You don't have the previlege to access this page </Typography>
      </PublicNavigation>
    );
  }

  // Everthing else is public
  return (
    <PublicNavigation>
      <Component {...pageProps} key={router.asPath} />{" "}
    </PublicNavigation>
  );

};

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
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
          <SnackbarProvider
            maxSnack={3}
            content={(key, message) => <div data-cy="snack bar">{message}</div>}
          >
            <CssBaseline />
            <AppWrapper Component={Component} pageProps={pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
