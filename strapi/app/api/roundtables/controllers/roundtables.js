"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const axios = require("axios");

/***
 * Currently no series identifer is given. So have to return all rountables regardless which series they belong to.
 * If the API calls can container series identifier, this api can be modified to only
 * return the corresponding roundtables, which I think is more reasonable.
 */
module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */
  async find(ctx) {
    // const entity = await strapi.query("roundtables").find({'series': });

    /***
     * Get roundtable collections from Strapi
     */
    const entity = await strapi.services["roundtables"].find();
    const roundtables = sanitizeEntity(entity, {
      model: strapi.models["roundtables"],
    });

    /***
     * Get All bookings from Calendly
     */
    const meURLresponse = await axios({
      method: "get",
      url: "https://api.calendly.com/users/me",
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });

    const user = meURLresponse.resource.uri;
    const queryURL =
      "https://api.calendly.com/scheduled_events?status=active&" +
      meURLresponse.resource.uri +
      "&sort=start_time:asc";

    const bookingResponse = await axios({
      method: "get",
      url: queryURL,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });

    var bookings = bookingResponse.collection;

    // continue to retrieve bookings if there is a next_page
    var nextPageLink = bookingResponse.pagination.next_page;
    while (nextPageLink !== "null") {
      var nextResponse = await axios({
        method: "get",
        url: nextPageLink,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });
      bookings.concat(nextResponse.collection);
      nextPageLink = nextResponse.pagination.next_page;
    }

    /***
     * Merge results from Strapi and Calendly together
     */
    var finalRes = [];
    for (const roundtable of roundtables) {
      const resource = response.data.resource;
      const data = {
        id: series.id,
        title: series.title,
        description: resource.description_plain,
        videoLink: series.videoLink,
        researchPartner: series.researchPartner.username,
        schedulingUrl: resource.scheduling_url,
      };
      finalRes.push(data);
    }

    return finalRes;
  },
};
