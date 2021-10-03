module.exports = ({ env }) => ({
  upload: {
    provider: "googledrive",
    providerOptions: {
      provider: "googledrive",
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
    },
  },
});
