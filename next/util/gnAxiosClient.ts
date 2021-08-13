/* eslint-disable no-param-reassign */
import axios from "axios";
import { getSession } from "next-auth/client";

const gnAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAxiosClientAuth = async () => {
  // Set the AUTH token for any outgoing request
  gnAxiosClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.jwt}`;
    }
    return config;
  });
  return gnAxiosClient;
};

export default gnAxiosClient;
