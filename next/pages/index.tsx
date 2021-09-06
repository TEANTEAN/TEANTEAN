import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";
import Header from "components/Header";
import Footer from "components/Footer";

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>genyus Rountable (Admin)</h1>
    <GeneralButton href="/test/buttons">Button Library</GeneralButton>
    <GeneralButton href="/test/form">Form example</GeneralButton>
    <GeneralButton href="/login">Login</GeneralButton>
    <GeneralButton href="/series/613488a555e59a59f4b9eac7">Secret link to booking</GeneralButton>
    <GeneralButton href="/enquiry">Enquiry</GeneralButton>
    <GeneralButton href="/admin/createaccount">Create Account</GeneralButton>
    <GeneralButton href="/admin/createseries">Create Series</GeneralButton>
    <GeneralButton href="/landing">Landing</GeneralButton>
  </div>
);

export default Home;
