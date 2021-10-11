"use strict";
const { drive } = require("../../../util/GoogleDrive");
const { sanitizeEntity } = require("strapi-utils");

// GET /drive
module.exports = {
  async find(ctx) {
    try {
      const entities = await strapi.services["roundtable-series"].find();
      const allSeries = entities.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.models["roundtable-series"],
        })
      );

      const result = allSeries.map((series) => {
        return {
          id: series.id,
        };
      });
      return result;
    } catch (err) {
      throw err;
    }
  },

  async findOne(ctx) {
    const id = ctx.request?.query?.id;

    const entity = await strapi.services["roundtable-series"].findOne({ id });

    const series = sanitizeEntity(entity, {
      model: strapi.models["roundtable-series"],
    });

    const calendlyEventType = (await calendlyAxios(series.seriesURI)).data
      .resource;

    return {
      id: series.id,
      name: calendlyEventType.name,
      description_html: calendlyEventType.description_html,
      scheduling_url: calendlyEventType.scheduling_url,
      videoLink: series.videoLink,
      organisation: {
        driveFileId: series.organisation.image.driveFileId,
        name: series.organisation.name,
      },
    };
  },
};
