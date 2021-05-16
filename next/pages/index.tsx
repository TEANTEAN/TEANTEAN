import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>genyus Rountable</h1>
    <GeneralButton href="/buttons">Button Library</GeneralButton>
    <GeneralButton href="/form">Form example</GeneralButton>
  </div>
);

export default Home;
