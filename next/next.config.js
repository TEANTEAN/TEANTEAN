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
        },
      };
  }
};
