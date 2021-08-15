import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const API_URL = 'http://localhost:1337'

const options = {
    providers: [
        Providers.Credentials({
            name: "Credentials",
            // What is required for the sign in
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "John@does.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            // How credentials is used to authenticate
            async authorize(credentials) {
                try {
                        const {data} = await axios.post(`${API_URL}/auth/local`, {
                            identifier: credentials.username,
                            password: credentials.password
                        });
                        const user = data;
                        if (user) {
                            return user;
                        } else {
                            return null;
                        }
                } catch (e) {
                    throw new Error ("Error on user authentication");
                }
            }
        })
    ],
    session: {
        jwt: true
    },
    callbacks: {
        jwt: async (token, user, account) => {
            const isSignIn = user ? true : false;
            
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
            return url.startsWith(baseUrl) ? url : baseUrl
        },

        session: async (session, user) => {
            session.jwt = user.jwt;
            session.id = user.id;
            session.user.role = user.role;
            return Promise.resolve(session);
            }
        },
        pages: {
            signIn: "/login",
        }
}

export default (req, res) => NextAuth(req, res, options);