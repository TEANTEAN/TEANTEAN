import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";
import Header from "components/Header";
import Footer from "components/Footer";

// import { google, drive_v3, Common } from "googleapis";

// // the following codes should only be run in the server side
// // if running at client side, there will be "Module not found" errors.
// // I am not sure what & how to run it at the server side...
// const auth = new google.auth.GoogleAuth({
//     keyFile: 'server-credentials.json',
//     scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly']
// })

// const drive: drive_v3.Drive = google.drive({
//     version: 'v3',
//     auth,
// });

// drive.files.list({
//   pageSize: 10,
//   fields: 'nextPageToken, files(id, name)',
// }, (err, res) => {
//   if (err) return console.log('The API returned an error: ' + err);
//   const files = res.data.files;
//   if (files.length) {
//     console.log('Files:');
//     files.map((file) => {
//       console.log(`${file.name} (${file.id})`);
//     });
//   } else {
//     console.log('No files found.');
//   }
// });

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <h1>genyus Rountable (Admin)</h1>
    <GeneralButton href="/test/buttons">Button Library</GeneralButton>
    <GeneralButton href="/test/form">Form example</GeneralButton>
    <GeneralButton href="/login">Login</GeneralButton>
    <GeneralButton href="/series/613488a555e59a59f4b9eac7">
      Secret link to booking
    </GeneralButton>
    <GeneralButton href="/enquiry">Enquiry</GeneralButton>
    <GeneralButton href="/admin/createaccount">Create Account</GeneralButton>
    <GeneralButton href="/admin/createseries">Create Series</GeneralButton>
    <GeneralButton href="/landing">Landing</GeneralButton>
    <GeneralButton href="/viewexample">View Example</GeneralButton>
    <GeneralButton href="/downloadexample">Download Example</GeneralButton>
    <GeneralButton href="/permissionexample">Permission Example</GeneralButton>
    <Footer />
  </div>
);

export default Home;
