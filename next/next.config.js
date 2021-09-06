const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      // environment variables for local development
      return {
        serverRuntimeConfig: {},
        publicRuntimeConfig: {},
        env: {
          NEXT_PUBLIC_ENV_NAME: process.env.NEXT_PUBLIC_ENV_NAME,
          NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
          BUILD_HOST: process.env.NEXT_PUBLIC_HOST,
          NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          GDRIVE_TYPE: process.env.GDRIVE_TYPE,
          GDRIVE_PROJECT_ID: process.env.GDRIVE_PROJECT_ID,
          GDRIVE_PRIVATE_KEY_ID: process.env.GDRIVE_PRIVATE_KEY_ID,
          GDRIVE_PRIVATE_KEY: process.env.GDRIVE_PRIVATE_KEY,
          GDRIVE_CLIENT_EMAIL: process.env.GDRIVE_CLIENT_EMAIL,
          GDRIVE_CLIENT_ID: process.env.GDRIVE_CLIENT_ID,
          GDRIVE_AUTH_URI: process.env.GDRIVE_AUTH_URI,
          GDRIVE_TOKEN_URI: process.env.GDRIVE_TOKEN_URI,
          GDRIVE_AUTH_PROVIDER_X509_CERT_URL:
            process.env.GDRIVE_AUTH_PROVIDER_X509_CERT_URL,
          GDRIVE_CLIENT_X509_CERT_URL: process.env.GDRIVE_CLIENT_X509_CERT_URL,
        },
      };

    default:
      return {
        serverRuntimeConfig: {},
        publicRuntimeConfig: {},
        env: {
          NEXT_PUBLIC_ENV_NAME: process.env.NEXT_PUBLIC_ENV_NAME,
          NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
          BUILD_HOST: process.env.NEXT_PUBLIC_HOST,
          NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          GDRIVE_TYPE: process.env.GDRIVE_TYPE,
          GDRIVE_PROJECT_ID: process.env.GDRIVE_PROJECT_ID,
          GDRIVE_PRIVATE_KEY_ID: process.env.GDRIVE_PRIVATE_KEY_ID,
          GDRIVE_PRIVATE_KEY: process.env.GDRIVE_PRIVATE_KEY,
          GDRIVE_CLIENT_EMAIL: process.env.GDRIVE_CLIENT_EMAIL,
          GDRIVE_CLIENT_ID: process.env.GDRIVE_CLIENT_ID,
          GDRIVE_AUTH_URI: process.env.GDRIVE_AUTH_URI,
          GDRIVE_TOKEN_URI: process.env.GDRIVE_TOKEN_URI,
          GDRIVE_AUTH_PROVIDER_X509_CERT_URL:
            process.env.GDRIVE_AUTH_PROVIDER_X509_CERT_URL,
          GDRIVE_CLIENT_X509_CERT_URL: process.env.GDRIVE_CLIENT_X509_CERT_URL,
        },
      };
  }
};
