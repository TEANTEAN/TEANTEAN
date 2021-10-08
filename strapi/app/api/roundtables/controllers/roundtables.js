"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");

/***
 * Currently no series identifer is given. So have to return all rountables regardless which series they belong to.
 * If the API calls can container series identifier, this api can be modified to only
 * return the corresponding roundtables, which I think is more reasonable.
 */
module.exports = {
  /**
   * Retrieve a roundtable preview, including participants preview.
   *
   * @return {
   * start: string,
   * end: string,
   * location: string,
   * createdAt: string,
   * participants: any[],
   * files: any[]
   * }
   */
  async find(ctx) {
    /***
     * No Param
     */

    const { uri } = ctx.query;

    /***
     * Get roundtable detail from Calendly
     */
    const roundtableURI = "https://api.calendly.com/scheduled_events/" + uri;
    const roundtableURLresponse = await axios({
      method: "get",
      url: roundtableURI,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });
    const roundtableDetails = roundtableURLresponse.data.resource;

    /***
     * Get All participants from Calendly
     */
    let inviteeURI =
      "https://api.calendly.com/scheduled_events/" + uri + "/invitees";
    let inviteesURLresponse = await axios({
      method: "get",
      url: inviteeURI,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    });

    let invitees = inviteesURLresponse.data.collection;

    /***
     * Merge MongoDB and Calendly by participants
     */
    let participants = invitees.map(function (invitee) {
      return {
        uri: invitee.uri.split("/").pop(),
        name: invitee.name,
        email: invitee.email,
        payment: "",
        certification: "",
      };
    });

    /***
     * Continue get participants if there are more
     * results from Calendly
     */
    while (inviteesURLresponse.data.pagination.next_page !== null) {
      inviteeURI = inviteesURLresponse.data.pagination.next_page;
      inviteesURLresponse = await axios({
        method: "get",
        url: inviteeURI,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });

      invitees = inviteesURLresponse.data.collection;

      participants += invitees.map(function (invitee) {
        return {
          uri: invitee.uri.split("/").pop(),
          name: invitee.name,
          email: invitee.email,
          payment: "",
          certification: "",
        };
      });
    }

    /***
     * Get roundtable files from Strapi
     */
    const params = {
      roundtableURI: uri,
    };
    const entity = await strapi.query("roundtables").findOne(params);

    const roundtable = sanitizeEntity(entity, {
      model: strapi.models["roundtables"],
    });

    let roundtableFiles = roundtable.files.map(function (file) {
      return file.driveFileUrl;
    });

    /***
     * Get participant files from Strapi
     */
    for (const participant of participants) {
      for (const participantData of roundtable.participants) {
        if (participant.uri === participantData.participantURI) {
          participant.payment = participantData.receipt.driveFileUrl;
          participant.certification = participantData.certificate.driveFileUrl;
        }
      }
    }

    /***
     * Merge results from Roundtable and Participants together
     */
    const finalRes = {
      start: roundtableDetails.start_time,
      end: roundtableDetails.end_time,
      location: roundtableDetails.location.join_url,
      createdAt: roundtableDetails.created_at,
      participants: participants,
      files: roundtableFiles,
    };

    return finalRes;
  },
};
