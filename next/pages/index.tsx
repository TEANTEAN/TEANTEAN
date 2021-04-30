import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "../components/Buttons";

// Here you can see how our manually added 'requiredProps' hasn't been included, 
// so this component throws an error.

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>genyus Rountable</h1>
			<GeneralButton href="/buttons">Button Library</GeneralButton>
		</div>
	);
}

export default Home;
