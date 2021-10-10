"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const calendlyAxios = require("../../../util/calendlyAxios");
const { drive } = require("../../../util/GoogleDrive");
const getFormattedDate = require("../../../util/formatDate");

module.exports = {
  async create(ctx) {
    try {
      let newSeries = {
        ...ctx.request.body,
      };

      // Get Calendly Event details
      /**
       * Relevant event fields:
       *  - name
       *  - description_plain
       *  - duration
       *  - created_at
       *  - scheduling_url
       */
      const calendlyEventTypeData = (await calendlyAxios(newSeries.seriesURI))
        .data.resource;
      const seriesUri = calendlyEventTypeData.uri.split("/").pop();

      const newSeriesFolderName = `${calendlyEventTypeData.name} - ${seriesUri}`;
      // Create new folder for series
      const newSeriesFolder = (
        await drive.files.create({
          supportsAllDrives: true,
          supportsTeamDrives: true,
          fields: "id",
          requestBody: {
            mimeType: "application/vnd.google-apps.folder",
            name: newSeriesFolderName,
            parents: [`${process.env.ROOT_SERIES_FOLDER_ID}`],
          },
        })
      ).data;

      const newResearchPartnerFolderName = `Research Partner SHARED - ${seriesUri}`;
      const newResearchPartnerFolder = (
        await drive.files.create({
          supportsAllDrives: true,
          supportsTeamDrives: true,
          fields: "id",
          requestBody: {
            mimeType: "application/vnd.google-apps.folder",
            name: newResearchPartnerFolderName,
            parents: [newSeriesFolder.id],
          },
        })
      ).data;

      const newRoundtablesFolderName = `Roundtables - ${seriesUri}`;
      const newRoundtablesFolder = (
        await drive.files.create({
          supportsAllDrives: true,
          supportsTeamDrives: true,
          fields: "id",
          requestBody: {
            mimeType: "application/vnd.google-apps.folder",
            name: newRoundtablesFolderName,
            parents: [newSeriesFolder.id],
          },
        })
      ).data;

      newSeries = {
        ...newSeries,
        seriesFolderName: newSeriesFolderName,
        seriesFolderId: newSeriesFolder.id,
        researchPartnerFolderName: newResearchPartnerFolderName,
        researchPartnerFolderId: newResearchPartnerFolder.id,
        roundtablesFolderName: newRoundtablesFolderName,
        roundtablesFolderId: newRoundtablesFolder.id,
      };

      const entity = await strapi.services["roundtable-series"].create(
        newSeries
      );
      return sanitizeEntity(entity, {
        model: strapi.models["roundtable-series"],
      });
    } catch (e) {
      throw e;
    }
  },

  async find(ctx) {
    const entities = await strapi.services["roundtable-series"].find();
    const allSeries = entities.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.models["roundtable-series"],
      })
    );

    const calendlyEventTypesUrl = `https://api.calendly.com/event_types?user=${
      process.env.CALENDLY_USER_ID ||
      "https://api.calendly.com/users/EDEFZMCPTDBY2COR"
    }&count=100`;

    let response = await calendlyAxios(calendlyEventTypesUrl);
    let eventTypes = response.data.collection;

    // Keep making request if multiple pages
    while (response.data.pagination.next_page) {
      response = await calendlyAxios(response.data.pagination.next_page);
      eventTypes = [...eventTypes, ...response.data.collection];
    }

    // Merge calendly event type data with series
    for (let i = 0; i < allSeries.length; i++) {
      let matchingEventType = eventTypes.find(
        (eventType) => eventType.uri === allSeries[i].seriesURI
      );

      if (matchingEventType) {
        allSeries[i] = {
          ...allSeries[i],
          ...matchingEventType,
        };
      }
    }

    return allSeries;
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    try {
      // Get the id of the series
      const { id } = ctx.params;

      // Get the data stored in our database for a series and clean it
      const entity = await strapi.services["roundtable-series"].findOne({ id });
      const series = sanitizeEntity(entity, {
        model: strapi.models["roundtable-series"],
      });

      // Get Calendly Event details
      /**
       * Relevant event fields:
       *  - name
       *  - description_plain
       *  - duration
       *  - created_at
       *  - scheduling_url
       */
      const calendlyEventType = (await calendlyAxios(series.seriesURI)).data
        .resource;

      // Calendly API URL to get all scheduled events (Booking was made on the calendly booking tool)
      const cScheduledEventsURL = `https://api.calendly.com/scheduled_events?user=${
        process.env.CALENDLY_USER_ID ||
        "https://api.calendly.com/users/EDEFZMCPTDBY2COR"
      }&count=100`;

      // For holding the scheduled events
      let calendlyRoundtables = [];

      // Get all scheduled events (there's no way to get all events that belong to one event type)
      let response = await calendlyAxios(cScheduledEventsURL);

      /**
       * Roundtable fields that are relevant
       * - Series name
       * - start_time
       * - end_time
       * - location
       * - created_at
       * - uri
       */
      calendlyRoundtables = [
        ...response.data.collection.filter(
          // only select scheduled events associated with the series
          (e) => e.event_type === series.seriesURI
        ),
      ];
      // Keep making request if multiple pages
      while (response.data.pagination.next_page) {
        response = await calendlyAxios(response.data.pagination.next_page);
        calendlyRoundtables = [
          ...calendlyRoundtables,
          ...response.data.collection.filter(
            (e) => e.event_type === series.seriesURI
          ),
        ];
      }

      // Sync the roundtables in this series with the ones in the database)
      for (let i = 0; i < calendlyRoundtables.length; i++) {
        const calendlyRoundtable = calendlyRoundtables[i];
        let dbRoundtableMatchIndex = series.roundtables.findIndex(
          (dbRoundTable) => dbRoundTable.calendlyUri == calendlyRoundtable.uri
        );
        if (dbRoundtableMatchIndex === -1) {
          // The record does not exist, so we need to make one
          // Create google drive folder for the meeting inside the series folder
          const startTime = new Date(calendlyRoundtable.start_time);
          const endTime = new Date(calendlyRoundtable.end_time);
          const meetingFolderName = `Roundtable (${getFormattedDate(
            startTime
          )} - ${getFormattedDate(endTime)}) - ${calendlyRoundtable.uri
            .split("/")
            .pop()}`;
          const newFolder = await drive.files.create({
            supportsAllDrives: true,
            supportsTeamDrives: true,
            fields: "id, name",
            requestBody: {
              mimeType: "application/vnd.google-apps.folder",
              name: meetingFolderName,
              parents: [`${series.roundtablesFolderId}`], // parent folder is series/roundtables/
            },
          });

          const newRoundtable = await strapi.services["roundtables"].create({
            meetingFolderName: newFolder.data.name,
            meetingFolderId: newFolder.data.id,
            calendlyUri: calendlyRoundtable.uri,
            series: series.id,
          });

          const sanitizedRoundtable = sanitizeEntity(newRoundtable, {
            model: strapi.models.roundtables,
          });

          series.roundtables.push({
            ...sanitizedRoundtable,
            ...calendlyRoundtable,
          });
        } else {
          // Merge the two
          series.roundtables[dbRoundtableMatchIndex] = {
            ...series.roundtables[dbRoundtableMatchIndex],
            ...calendlyRoundtable,
          };
        }
      }

      // Response type:
      //  "files": [],
      // "_id": "61601ea52e07360c54fb12ad",
      // "title": "15 Minute Meeting",
      // "videoLink": "NO LINK",
      // "seriesURI": "https://api.calendly.com/event_types/FEMHP3CGSXJZZI2K",
      // "published_at": "2021-10-08T10:38:30.660Z",
      // "createdAt": "2021-10-08T10:34:13.063Z",
      // "updatedAt": "2021-10-08T10:38:30.722Z",
      // "__v": 0,
      // "organisation": {
      //     "_id": "613dd1b0c9606e1b0cd89a72",
      //     "name": "University of Melbourne",
      //     "published_at": "2021-09-12T11:54:47.923Z",
      //     "createdAt": "2021-09-12T10:08:48.855Z",
      //     "updatedAt": "2021-09-12T11:54:47.997Z",
      //     "__v": 0,
      //     "id": "613dd1b0c9606e1b0cd89a72"
      // },
      // "researchPartner": {
      //     "confirmed": true,
      //     "blocked": false,
      //     "_id": "61346f467b136f55740eb156",
      //     "username": "yang",
      //     "email": "yang@test.io",
      //     "provider": "local",
      //     "createdAt": "2021-09-05T07:18:30.700Z",
      //     "updatedAt": "2021-09-12T22:19:25.029Z",
      //     "__v": 0,
      //     "role": "61343703fc189f2edfa1ec31",
      //     "id": "61346f467b136f55740eb156"
      // },
      // "roundtables": [
      //     {
      //         "files": [],
      //         "_id": "61601f2d2e07360c54fb12ae",
      //         "published_at": "2021-10-08T10:38:25.044Z",
      //         "createdAt": "2021-10-08T10:36:29.202Z",
      //         "updatedAt": "2021-10-08T10:38:25.115Z",
      //         "__v": 0,
      //         "peerLeader": "612f2379db68b6247bd71e1c",
      //         "series": "61601ea52e07360c54fb12ad",
      //         "id": "61601f2d2e07360c54fb12ae"
      //     }
      // ],
      // "id": "61601ea52e07360c54fb12ad",

      // const finalRes = {
      //   ...series,
      //   calendlyEvent: calendlyEventType.data.resource,
      //   calendlyScheduledEvents: roundtables,
      // };
      return {
        ...series,
        ...calendlyEventType,
      };
    } catch (e) {
      throw e;
    }
    // const { id } = ctx.params;

    // const entity = await strapi.services["roundtable-series"].findOne({ id });

    // const series = sanitizeEntity(entity, {
    //   model: strapi.models["roundtable-series"],
    // });

    // const response = await axios({
    //   method: "get",
    //   url: series.seriesURI,
    //   headers: {
    //     Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
    //   },
    // });

    // const resource = response.data.resource;

    // series.description = resource.description_plain;
    // series.scheduling_url = resource.scheduling_url;

    // const finalRes = {
    //   id: series.id,
    //   title: series.title,
    //   description: resource.description_plain,
    //   videoLink: series.videoLink,
    //   researchPartner: series.researchPartner.username,
    //   schedulingUrl: resource.scheduling_url,
    // };

    // return finalRes;
  },
};
