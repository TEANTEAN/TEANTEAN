import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppProps } from "next/app";
import Head from 'next/head'
import theme from "../styles/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (<>
		<Head>
			<meta name="theme-color" content={theme.palette.primary.main} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
			/>
		</Head>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	</>);
}

export default MyApp;
