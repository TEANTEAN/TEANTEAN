import { google } from "googleapis";
import streams from "memory-streams";

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
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

/**
 * ONLY use this function server-side (i.e in getStaticProps or getServerSideProps)
 * See usage in pages/example/static-drive-fetch
 * @param id the file id
 * @returns a base64 string representation of the image file
 */
const getDriveImageAsString = async (id: string) => {
  const writableStream = new streams.WritableStream();

  return new Promise((resolve, reject) => {
    drive.files
      .get(
        {
          fileId: id,
          alt: "media",
        },
        { responseType: "stream" }
      )
      .then((res) => {
        res.data
          .on("end", () => {
            try {
              const buffer = writableStream.toBuffer();
              const base64 = buffer.toString("base64");

              resolve(base64);
            } catch (err) {
              reject(err);
            }
          })
          .on("error", (err) => {
            console.log("Error during download", err);
            reject(err);
          })
          .pipe(writableStream);
      });
  });
};

// eslint-disable-next-line import/prefer-default-export
export { getDriveImageAsString };
