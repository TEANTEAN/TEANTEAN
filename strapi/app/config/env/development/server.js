module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "ac46854aee663d9f09995f1789eb16db"),
    },
    watchIgnoreFiles: ["**/temp-drive-uploads/**"],
  },
});
