import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";
import Image from "next/image";

import { google, drive_v3 } from "googleapis";

// later change the following vars to env files
const auth = new google.auth.GoogleAuth({
    keyFile: 'server-credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly']
})

const drive: drive_v3.Drive = google.drive({
    version: 'v3',
    auth,
});

drive.files.list({
  pageSize: 10,
  fields: 'nextPageToken, files(id, name)',
}, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const files = res.data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No files found.');
  }
});

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>genyus Rountable (Admin)</h1>
    <GeneralButton href="/buttons">Button Library</GeneralButton>
    <GeneralButton href="/form">Form example</GeneralButton>
    <GeneralButton href="/login">Login</GeneralButton>
    <GeneralButton href="/enquiry">Enquiry</GeneralButton>
    <GeneralButton href="/createaccount">Create Account</GeneralButton>
    <GeneralButton href="/createseries">Create Series</GeneralButton>
    <GeneralButton href="/landing">Landing</GeneralButton>
    <GeneralButton href="/upload">Upload Example</GeneralButton>
  </div>
);

export default Home;
