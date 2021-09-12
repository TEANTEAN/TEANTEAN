import { google } from "googleapis";
import streams from "memory-streams";

const privateKey = process.env.GDRIVE_PRIVATE_KEY_ID.replace(" ", "\n");

const credentials = {
  type: "service_account",
  project_id: "gn-test-324202",
  private_key_id: process.env.GDRIVE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: "gn-test@gn-test-324202.iam.gserviceaccount.com",
  client_id: "115160740289539111977",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/gn-test%40gn-test-324202.iam.gserviceaccount.com",
};

console.log("Google private key: ", credentials.private_key);

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
