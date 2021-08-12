/* eslint-disable no-param-reassign */
// /* eslint-disable no-console */
// /**
//  * Custom axios fetch function that adds the authentication token to requests
//  *
//  * @param url the url to fetch from
//  * @param method standard http method in string form, eg. "POST"
//  * @param payload payload to send in JSON form
//  * @returns the response in object form, specified with the generic 'ReturnType'
//  */
// export default async function gnFetch<ReturnType>(
//   url: string,
//   method?: string,
//   payload?: any
// ) {
//   // get session from next-auth

//   // Log request on development
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     console.log(`${method || "GET"} to ${url}`);
//   }

//   const result = await fetch(url, {
//     method: method || "GET",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "NEEDED",
//     },
//     body: JSON.stringify(payload),
//   });

//   // Log request on development
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     console.log("Response: ", result);
//   }
//   if (result.ok) {
//     if (result.status === 204) return null;
//     const jsonResult = await result.json();
//     return jsonResult as ReturnType;
//   }
//   let errResult = await result.text();
//   if (!errResult) {
//     errResult = result.statusText;
//   }
//   throw new Error(errResult);
// }
import axios from "axios";

import { Session } from "next-auth";
import { useSession } from "next-auth/client";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_PATH,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
