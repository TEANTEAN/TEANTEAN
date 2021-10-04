"use strict";

const axios = require("axios");
module.exports = {
  async events(ctx) {
    const Calendly_API_URL = ctx.originalUrl.replace(
      "/calendly/event_types",
      "https://api.calendly.com/event_types"
    );
    try {
      const response = await axios({
        method: "get",
        url: Calendly_API_URL,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });
      ctx.send(response.data);
    } catch (err) {
      throw err;
    }
  },
};
