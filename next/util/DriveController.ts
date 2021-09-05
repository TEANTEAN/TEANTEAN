import { google, drive_v3, Common } from "googleapis";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
  keyFile: "server-credential.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

const getAllFiles = () => drive.files.list();

const makeFolder = () => {
  const fileMetadata = {
    name: "Invoices",
    mimeType: "application/vnd.google-apps.folder",
  };
  drive.files.create(
    {
      resource: fileMetadata,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("Folder Id: ", file.id);
      }
    }
  );
};

// function to upload the file
const uploadFile = () => {
  const folderId = "1V7uKUWVA5HyLGx96x2bQLoqpAHAiu2V9";
  const fileMetadata = {
    name: "photo.png",
    parents: [folderId],
  };
  const media = {
    mimeType: "image/png",
    body: fs.createReadStream("./util/gn-logo.png"),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("Folder Id: ", file.id);
      }
    }
  );
};

export { getAllFiles, makeFolder, uploadFile };
