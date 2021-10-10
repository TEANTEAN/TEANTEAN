const axios = require("axios");

// Axios function for making multiple requests
module.exports = calendlyAxios = async (link) => {
  return axios({
    method: "get",
    url: link,
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
    },
  });
};
