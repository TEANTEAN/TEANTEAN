import Head from "next/head";
import { GeneralButton } from "../components/Buttons";

export default function Home() {
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
