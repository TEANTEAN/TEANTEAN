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
    const { uri } = ctx.params;

    const entity = await strapi.services["roundtables"].findOne({
      roundtableURI: uri,
    });

    var roundtable = sanitizeEntity(entity, {
      model: strapi.models["roundtables"],
    });

    /***
     * Get roundtable detail from Calendly
     */
    const roundtableURI =
      "https://api.calendly.com/scheduled_events/" + roundtable.roundtableURI;
    const roundtableURLresponse = await axios({
      method: "get",
      url: roundtableURI,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });
    roundtable = roundtableURLresponse.resource;

    /***
     * Get All participants from Calendly
     */
    const inviteeURI =
      "https://api.calendly.com/scheduled_events/" +
      roundtables.roundtableURI +
      "/invitees";
    const inviteesURLresponse = await axios({
      method: "get",
      url: inviteeURI,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });

    const invitees = inviteesURLresponse.collection;

    /***
     * Get participants files from google drive
     */

    /***
     * Merge MongoDB and Calendly by participants
     */
    var participants = [];
    invitees.forEach(function (invitee) {
      participants.push({
        uri: invitee.uri,
        name: invitee,
        email: invitee,
        payment: invitee,
        certification: invitee,
      });
    });

    /***
     * Post invitees to Strapi
     */

    /***
     * Get roundtable files from google drive
     */

    /***
     * Merge results from Roundtable and Participants and MongoDB together
     */
    const finalRes = {
      start: roundtable.start_time,
      end: roundtable.end_time,
      location: roundtable.location.location,
      createdAt: roundtable.created_at,
      participants: participants,
      files: [],
    };

    return finalRes;
  },
};
