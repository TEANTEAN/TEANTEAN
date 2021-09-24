/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios, { AxiosResponse } from "axios";

/**
 * An axios client that that attaches the jwt to each request
 */
const clyAxiosClient = axios.create({
  baseURL: process.env.CALENDLY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("url env: ", process.env.CALENDLY_API_URL);

// Add console logging if running in development mode
if (process.env.NEXT_PUBLIC_ENV_NAME === "development") {
  clyAxiosClient.interceptors.request.use((request) => {
    console.log(`Sending ${request.method.toUpperCase()} to ${request.url}`);
    if (request?.headers.Authorization) {
      console.log("with authorization: ", request?.headers.Authorization);
    }
    return request;
  });

  clyAxiosClient.interceptors.response.use((response) => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  });
}

// Set the AUTH token for any outgoing request
clyAxiosClient.interceptors.request.use(async (request) => {
  console.log(
    `attaching bearer token: ${process.env.CALENDLY_API_URL} to requests`
  );
  request.headers.Authorization = `Bearer ${process.env.CALENDLY_TOKEN}`;
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

export default clyAxiosClient;
