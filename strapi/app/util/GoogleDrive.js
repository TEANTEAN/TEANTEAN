const { google } = require("googleapis");

const credentials = {
  type: process.env.GDRIVE_TYPE,
  project_id: process.env.GDRIVE_PROJECT_ID,
  private_key_id: process.env.GDRIVE_PRIVATE_KEY_ID,
  private_key: process.env.GDRIVE_PRIVATE_KEY,
  client_email: process.env.GDRIVE_CLIENT_EMAIL,
  client_id: process.env.GDRIVE_CLIENT_ID,
  auth_uri: process.env.GDRIVE_AUTH_URI,
  token_uri: process.env.GDRIVE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GDRIVE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GDRIVE_CLIENT_X509_CERT_URL,
};

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

const setAuthClient = async () => {
  const authClient = await auth.getClient();
  google.options({ auth: authClient });
};

// test

// const makeFolder = () => {
//   const fileMetadata = {
//     name: "Invoices",
//     mimeType: "application/vnd.google-apps.folder",
//   };
//   drive.files.create(
//     {
//       resource: fileMetadata,
//       fields: "id",
//     },
//     (err, file) => {
//       if (err) {
//         // Handle error
//         console.error(err);
//       } else {
//         console.log("Folder Id: ", file.id);
//       }
//     }
//   );
// };

// function to upload the file
// const uploadFile = () => {
//   const folderId = "1V7uKUWVA5HyLGx96x2bQLoqpAHAiu2V9";
//   const fileMetadata = {
//     name: "strapi-upload.png",
//     parents: [folderId],
//   };
//   const media = {
//     mimeType: "image/png",
//     body: fs.createReadStream("./util/gn-logo.png"),
//   };
//   drive.files.create(
//     {
//       resource: fileMetadata,
//       media,
//       fields: "id",
//     },
//     (err, file) => {
//       if (err) {
//         // Handle error
//         console.error(err);
//       } else {
//         console.log("Folder Id: ", file.id);
//       }
//     }
//   );
// };

setAuthClient();

module.exports = { drive };
