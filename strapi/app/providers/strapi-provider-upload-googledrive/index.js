const { google } = require("googleapis");
const fs = require("fs");

const directory = "temp-drive-uploads";

module.exports = {
  init(providerOptions) {
    const credentials = {
      type: process.env.GDRIVE_TYPE,
      project_id: process.env.GDRIVE_PROJECT_ID,
      private_key_id: process.env.GDRIVE_PRIVATE_KEY_ID,
      private_key: process.env.GDRIVE_PRIVATE_KEY,
      client_email: process.env.GDRIVE_CLIENT_EMAIL,
      client_id: process.env.GDRIVE_CLIENT_ID,
      auth_uri: process.env.GDRIVE_AUTH_URI,
      token_uri: process.env.GDRIVE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GDRIVE_AUTH_PROVIDER_X509_CERT_URL,
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

    // const authClient = await auth.getClient();
    // google.options({ auth: authClient });

    //returning an object with two methods defined
    return {
      upload(file) {
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }
        const tempFilePath = `${directory}/${file.hash}`;
        fs.writeFileSync(tempFilePath, file.buffer);

        return new Promise(async (resolve, reject) => {
          try {
            let parent = null;
            if (file.path) {
              try {
                console.log("attempting to find file with name: ", file.path);
                const res = await drive.files.list({
                  q: `mimeType = 'application/vnd.google-apps.folder' and name = '${file.path}'`,
                });
                console.log("res: ", res);
                if (res.data.files && res.data.files.length > 0) {
                  console.log("found file: ", res.data.files);
                  parent = res.data.files[0].id;
                }
                // No parent folder found so create
                else {
                  const newFolder = await drive.files.create({
                    supportsAllDrives: true,
                    supportsTeamDrives: true,
                    fields: "id",
                    requestBody: {
                      mimeType: "application/vnd.google-apps.folder",
                      name: file.path,
                      parents: ["1V7uKUWVA5HyLGx96x2bQLoqpAHAiu2V9"], // parent folder is uploads
                    },
                  });
                  console.log("new parent created: ", newFolder);
                  parent = newFolder.data.id;
                }
              } catch (err) {
                console.log(err);
              }
            }
            console.log("creating file with parent: ", parent);
            const res = await drive.files.create({
              media: {
                body: fs.createReadStream(tempFilePath),
              },
              requestBody: {
                parents: [
                  parent ? parent : "1V7uKUWVA5HyLGx96x2bQLoqpAHAiu2V9", // defaults to uploads
                ],
                name: file.name,
              },
            });
            if (process.env.NODE_ENV === "development") {
              file.url = `http://localhost:1337/drive/${res.data.id}`;
            } else {
              file.url = `https://genyus-backend-strapi.herokuapp.com/drive/${res.data.id}`;
            }
            file.driveFileId = res.data.id;

            fs.unlinkSync(tempFilePath);

            resolve();
          } catch (err) {
            if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
            reject(err);
          }
        });
      },

      delete(file) {
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
    };
  },
};
