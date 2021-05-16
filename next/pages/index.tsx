import React from "react";
import {NextPage} from "next";
import Head from "next/head";
import {GeneralButton} from "components/Buttons";

const Index: NextPage = () => (
    <div>
        <Head>
            <title>Create Next App</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <GeneralButton href='/home'> Home page </GeneralButton>
        <GeneralButton href='/buttons'>Button Library</GeneralButton>
        <GeneralButton href='/form'>Form example</GeneralButton>
    </div>
);

export default Index;
