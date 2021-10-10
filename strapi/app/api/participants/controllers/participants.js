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
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      /***
       * No Param
       */
      if (id === undefined) {
        const entity = await strapi.query("participants").find();

        const participants = sanitizeEntity(entity, {
          model: strapi.models["participants"],
        });

        return participants;
      }

      /***
       * Get participant files from Strapi
       */
      const entity = await strapi.query("participants").findOne({ id });

      const participantData = sanitizeEntity(entity, {
        model: strapi.models["participants"],
      });

      /***
       * Get participants detail from Calendly
       */
      const response = await axios({
        method: "get",
        url: participantData.participantURI,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });
      const participantDetail = response.data.resource;

      /***
       * Merge results from details and data together
       */
      const finalRes = {
        ...participantData,
        ...participantDetail,
      };

      return finalRes;
    } catch (error) {
      throw error;
    }
  },
};
