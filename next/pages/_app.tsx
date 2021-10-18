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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import useHasMounted from "util/hooks/useHasMounted";
import AdminNavigation from "components/AdminNavigation";
import withAuth, { ROLES } from "util/hooks/withAuth";
import PublicNavigation from "components/PublicNavigation";
import { SnackbarProvider } from "notistack";
import Breadcrumbs from "components/Breadcrumbs";
import { Typography } from "@material-ui/core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

//  TODO: Research Partner wrapper

const AuthenticatedWrapper = ({ Component, pageProps }) => {
  const router = useRouter();
  const { session, haveAuthenticated } = withAuth({
    redirectTo: "/login",
  });

  if (session && haveAuthenticated()) {
    if (
      (router.pathname.includes("/admin") &&
        session.user?.role === ROLES.ADMIN) ||
      (router.pathname.includes("/peerleader") &&
        session.user?.role === ROLES.PEER_LEADER)
    ) {
      // We're properly authenticated for the page we're trying to access
      return (
        <AdminNavigation>
          <Breadcrumbs />
          <Component {...pageProps} />
        </AdminNavigation>
      );
    }
    return (
      // eslint-disable-next-line react/no-unescaped-entities
      <Typography variant="h5">You don't have access to this page</Typography>
    );
  }

  // Don't show admin portal while authenticating
  return null;
};

const AppWrapper = ({ Component, pageProps }) => {
  const hasMounted = useHasMounted();
  const router = useRouter();

  // Our application hasn't mounted yet so we don't know who's trying to access what pages
  // Safest is to render nothing
  if (!hasMounted) {
    return null;
  }

  // No wrapper for login
  if (router.pathname.includes("/login")) {
    return <Component {...pageProps} />;
  }

  // If user is logged in and the route includes any of the authenticated page urls, render the admin navigation skeleton and page
  if (
    router.pathname.includes("/admin") ||
    router.pathname.includes("/peerleader")
  ) {
    return <AuthenticatedWrapper Component={Component} pageProps={pageProps} />;
  }

  // No login is required, so render the page as normal without the admin skeleton
  return (
    <PublicNavigation>
      <Component {...pageProps} key={router.asPath} />
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
        <title>genyus Roundtable</title>
      </Head>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
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
