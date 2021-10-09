"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");

module.exports = {
  /**
   * if a roundtable uri is given,
   * then retrieve a roundtable preview, including participants preview.
   * else return a list of raw roundtables defined in Strapi.
   *
   * @return {
   * start: string,
   * end: string,
   * location: string,
   * createdAt: string,
   * participants: any[{
   *      uri: string,
   *      name: string,
   *      email: string,
   *      payment: string,
   *      certification: string
   *    }],
   * files: any[]
   * }
   */
  async find(ctx) {
    try {
      const { uri } = ctx.query;

      /***
       * No Param
       */
      if (uri === undefined) {
        const entity = await strapi.query("roundtables").find();

        const roundtables = sanitizeEntity(entity, {
          model: strapi.models["roundtables"],
        });

        return roundtables;
      }

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
            participant.certification =
              participantData.certificate.driveFileUrl;
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
    } catch (error) {
      throw error;
    }
  },
};
