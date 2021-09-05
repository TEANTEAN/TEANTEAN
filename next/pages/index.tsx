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
    <Header />
    <h1>genyus Rountable (Admin)</h1>
    <GeneralButton href="/buttons">Button Library</GeneralButton>
    <GeneralButton href="/form">Form example</GeneralButton>
    <GeneralButton href="/login">Login</GeneralButton>
    <GeneralButton href="/booking">Booking</GeneralButton>
    <GeneralButton href="/enquiry">Enquiry</GeneralButton>
    <GeneralButton href="/createaccount">Create Account</GeneralButton>
    <GeneralButton href="/resetPassword">Reset Password</GeneralButton>
    <GeneralButton href="/createseries">Create Series</GeneralButton>
    <GeneralButton href="/landing">Landing</GeneralButton>
    <Footer />
  </div>
);

export default Home;
