'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 const { sanitizeEntity } = require('strapi-utils');
 const axios = require("axios");

 module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services['roundtable-series'].findOne({ id });
    
    const series = sanitizeEntity(entity, { model: strapi.models['roundtable-series'] });
    
    const response = await axios({
      method: 'get',
      url: series.seriesURI,
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      }
    });

    const resource = response.data.resource;

    series.description = resource.description_plain;
    series.scheduling_url = resource.scheduling_url;

    const finalRes = {
      id: series.id,
      title: series.title,
      description: resource.description_plain,
      videoLink: series.videoLink,
      researchPartner: series.researchPartner.username,
      scheduling_url: resource.scheduling_url
    }

    return finalRes;

  },
};
