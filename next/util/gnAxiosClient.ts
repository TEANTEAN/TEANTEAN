/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/client";

/**
 * An axios client that that attaches the jwt to each request
 */
const gnAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("url env: ", process.env.NEXT_PUBLIC_BACKEND_URL);

// Add console logging if running in development mode
if (process.env.NEXT_PUBLIC_ENV_NAME === "development") {
  gnAxiosClient.interceptors.request.use((request) => {
    console.log(`Sending ${request.method.toUpperCase()} to ${request.url}`);
    if (request?.headers.Authorization) {
      console.log("with authorization: ", request?.headers.Authorization);
    }
    return request;
  });

  gnAxiosClient.interceptors.response.use((response) => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  });
}

// Set the AUTH token for any outgoing request
gnAxiosClient.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    console.log(`attaching bearer token: ${session.jwt} to requests`);
    request.headers.Authorization = `Bearer ${session.jwt}`;
  }
  return request;
});

export async function getData<ResponseType>(
  axiosRequest: Promise<AxiosResponse<ResponseType>>
) {
  try {
    const { data } = await axiosRequest;
    return data as ResponseType;
  } catch (err) {
    throw err;
  }
}

export default gnAxiosClient;
