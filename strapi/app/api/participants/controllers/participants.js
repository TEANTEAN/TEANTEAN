"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");

module.exports = {
  /**
   * if a participant uri is given,
   * then retrieve a roundtable preview, including participants preview.
   * else return a list of raw roundtables defined in Strapi.
   *
   * @return {
   * booking: string,
   * name: string,
   * email: string,
   * responses: any[{
   *    answer: string,
   *    positin: int,
   *    question: string
   * }],
   * certificate: string,
   * receipt: string
   * }
   */
  async find(ctx) {
    try {
      const { participantURI, roundtableURI } = ctx.query;

      /***
       * No Param
       */
      if (participantURI === undefined || roundtableURI === undefined) {
        const entity = await strapi.query("participants").find();

        const participants = sanitizeEntity(entity, {
          model: strapi.models["participants"],
        });

        return participants;
      }

      /***
       * Get participants detail from Calendly
       */
      const uri =
        "https://api.calendly.com/scheduled_events/" +
        roundtableURI +
        "/invitees/" +
        participantURI;
      const response = await axios({
        method: "get",
        url: uri,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });
      const participantDetail = response.data.resource;

      /***
       * Get participant files from Strapi
       */
      const params = {
        participantURI: participantURI,
      };
      const entity = await strapi.query("participants").findOne(params);

      const participantData = sanitizeEntity(entity, {
        model: strapi.models["participants"],
      });

      /***
       * Merge results from details and data together
       */
      const finalRes = {
        booking: participantDetail.created_at,
        name: participantDetail.name,
        email: participantDetail.email,
        responses: participantDetail.questions_and_answers,
        certificate: participantData.certificate.driveFileUrl,
        receipt: participantData.receipt.driveFileUrl,
      };

      return finalRes;
    } catch (error) {
      throw error;
    }
  },
};
