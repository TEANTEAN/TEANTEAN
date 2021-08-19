import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";
import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";

const Home: NextPage = () => (
  <div>
    <Header/>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>genyus Rountable</h1>
    <GeneralButton href="/buttons">Button Library</GeneralButton>
    <GeneralButton href="/form">Form example</GeneralButton>
    <GeneralButton href="/login">Login</GeneralButton>
    <Footer/>
  </div>
);

export default Home;
