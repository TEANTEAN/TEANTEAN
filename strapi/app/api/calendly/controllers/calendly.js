"use strict";
const calendlyAxios = require("../../../util/calendlyAxios");
const { sanitizeEntity } = require("strapi-utils");

// GET /calendly
module.exports = {
  async find(ctx) {
    try {
      // Calendly API URL to get all scheduled events (Booking was made on the calendly booking tool)
      const cScheduledEventsURL = `https://api.calendly.com/event_types?user=${
        process.env.CALENDLY_USER_ID ||
        "https://api.calendly.com/users/EDEFZMCPTDBY2COR"
      }&count=100`;

      let events = [];
      // Get all scheduled events (there's no way to get all events that belong to one event type)
      let response = await calendlyAxios(cScheduledEventsURL);

      events = [...response.data.collection];
      // Keep making request if multiple pages
      while (response.data.pagination.next_page) {
        response = await calendlyAxios(response.data.pagination.next_page);
        events = [...events, ...response.data.collection];
      }

      const entities = await strapi.services["roundtable-series"].find();
      const allSeries = entities.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.models["roundtable-series"],
        })
      );

      // strip out any events that already exist as Series in the db
      const res = events.filter(
        (event) =>
          allSeries.findIndex((series) => series.seriesURI === event.uri) === -1
      );

      return res;
    } catch (err) {
      throw err;
    }
  },

  // async findOne(ctx) {
  //   const id = ctx.request?.query?.id;
  //   const res = await drive.files.get();
  // },
};
