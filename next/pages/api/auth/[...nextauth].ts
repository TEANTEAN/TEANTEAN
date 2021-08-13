/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";
import { refreshAxiosClientAuth } from "util/gnAxiosClient";

// What is required for the sign in
const customCredentials = {
  username: {
    label: "Username",
    type: "text",
    placeholder: "John@does.com",
  },
  password: {
    label: "Password",
    type: "password",
  },
};

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: customCredentials,
      // How credentials is used to authenticate
      async authorize(credentials: typeof customCredentials) {
        try {
          const { data } = await axios.post(
            `https://genyus-backend-strapi.herokuapp.com/auth/local`,
            {
              identifier: credentials.username,
              password: credentials.password,
            }
          );
          const user = data;
          if (user) {
            await refreshAxiosClientAuth();
            return user;
          }
          return null;
        } catch (e) {
          throw new Error("Error on user authentication");
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user) => {
      const isSignIn = !!user;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
        token.role = user.user.role.name;
      }
      return Promise.resolve(token);
    },

    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      session.user.role = user.role;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login",
    // error: "/login", // Redirect to login on error
  },
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);
