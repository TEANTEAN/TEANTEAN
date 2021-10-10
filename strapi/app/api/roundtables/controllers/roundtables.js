"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");
const getFormattedDate = require("../../../util/formatDate");
const { drive } = require("../../../util/GoogleDrive");

module.exports = {
  /**
   * if a roundtable uri is given,
   * then retrieve a roundtable preview, including participants preview.
   * else return a list of raw roundtables defined in Strapi.
   *
   * @return {}
   * details of what's inside this object please
   * refer to the Strapi's roundtable collection type response object
   * and Calendly invitee response object
   */
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      /***
       * No Param
       */
      if (id === undefined) {
        const entity = await strapi.query("roundtables").find();

        const roundtables = sanitizeEntity(entity, {
          model: strapi.models["roundtables"],
        });

        return roundtables;
      }

      /***
       * Get roundtable data from Strapi
       */
      const entity = await strapi.query("roundtables").findOne({ id });

      let roundtable = sanitizeEntity(entity, {
        model: strapi.models["roundtables"],
      });

      if (roundtable === null) {
        return {};
      }

      const folderID = roundtable.meetingFolderId;
      const uri = roundtable.calendlyUri;

      /***
       * Get roundtable details from Calendly
       */
      const roundtableURLresponse = await axios({
        method: "get",
        url: uri,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });
      const roundtableDetails = roundtableURLresponse.data.resource;

      // merge Strapi and Calendly by roundtable
      roundtable = { ...roundtable, ...roundtableDetails };

      /***
       * Get All participants from Calendly
       */
      let inviteeURI = `${uri}/invitees`;
      let inviteesURLresponse = await axios({
        method: "get",
        url: inviteeURI,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });

      let invitees = inviteesURLresponse.data.collection;

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

        invitees = [...invitees, ...inviteesURLresponse.data.collection];
      }

      /***
       * Merge Calendly's participants' details into Strapi's participants
       */
      for (const participant of invitees) {
        const pURI = participant.uri;
        let index = roundtable.participants.findIndex(
          (o) => o.participantURI == pURI
        );
        // if Strapi does not conatin the entry
        // create one
        if (index === -1) {
          try {
            // create new folder for participant
            const newParticipantFolder = (
              await drive.files.create({
                supportsAllDrives: true,
                supportsTeamDrives: true,
                fields: "id, name",
                requestBody: {
                  mimeType: "application/vnd.google-apps.folder",
                  name: `${participant.name} - ${participant.uri
                    .split("/")
                    .pop()}`,
                  parents: [`${folderID}`],
                },
              })
            ).data;
            // create new entry in strapi
            const res = await strapi.services["participants"].create({
              participantURI: pURI,
              participantFolderId: newParticipantFolder.id,
              participantFolderName: newParticipantFolder.name,
              roundtable: roundtable.id,
              meetingURI: uri,
            });
            // add res into return object
            // and merge Strapi and Calendly by participant
            roundtable.participants.push({
              ...participant,
              ...sanitizeEntity(res, {
                model: strapi.models["participants"],
              }),
            });
          } catch (error) {
            throw error;
          }
        } else {
          // if Strapi contains the entry
          // merge Strapi and Calendly by participant
          roundtable.participants[index] = {
            ...participant,
            ...roundtable.participants[index],
          };
        }
      }

      return roundtable;
    } catch (error) {
      throw error;
    }
  },
};
