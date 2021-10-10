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
   * @return {
   * start: string,
   * end: string,
   * location: string,
   * createdAt: string,
   * participants: any[{
   *      id: string,
   *      uri: string,
   *      name: string,
   *      email: string,
   *      payment: string,
   *      certification: string
   *    }],
   * files: any[]
   * }
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

      const entity = await strapi.query("roundtables").findOne({ id });

      const roundtable = sanitizeEntity(entity, {
        model: strapi.models["roundtables"],
      });

      if (roundtable === null) {
        return {};
      }

      const folderID = roundtable.meetingFolderId;
      const uri = roundtable.meetingFolderName.split(" ").pop();

      /***
       * Get roundtable detail from Calendly
       */
      const roundtableURI = `https://api.calendly.com/scheduled_events/${uri}`;
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
      let inviteeURI = `https://api.calendly.com/scheduled_events/${uri}/invitees`;
      let inviteesURLresponse = await axios({
        method: "get",
        url: inviteeURI,
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      });

      let invitees = inviteesURLresponse.data.collection;

      /***
       * Start merging Strapi and Calendly by participants
       */
      let participants = invitees.map(function (invitee) {
        return {
          id: "",
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
            id: "",
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
      let roundtableFiles = roundtable.files.map(function (file) {
        return file.driveFileUrl;
      });

      /***
       * Get set of strapi participant uri
       */
      const strapiMap = new Map();
      for (const participant of roundtable.participants) {
        strapiMap.set(participant.participantURI, participant);
      }

      /***
       * merge caldenly participant with strapi data
       *
       * if this participant is stored in Strapi,
       * retrieve its files.
       *
       * if this participant is not stored in Strapi,
       * create folder and store it into Strapi.
       */
      for (const participant of participants) {
        const pURI = participant.uri;
        if (!strapiMap.has(pURI)) {
          try {
            // create new folder for participant
            const newParticipantFolder = (
              await drive.files.create({
                supportsAllDrives: true,
                supportsTeamDrives: true,
                fields: "id, name",
                requestBody: {
                  mimeType: "application/vnd.google-apps.folder",
                  name: `${participant.name} - ${uri}`,
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
            });
            strapiMap.set(pURI, {
              id: res.id,
              receipt: {
                driveFileUrl: "",
              },
              certificate: {
                driveFileUrl: "",
              },
            });
          } catch (error) {
            throw error;
          }
        }
      }

      const filteredParticipants = participants.map(function (participant) {
        const pURI = participant.uri;
        if (strapiMap.has(pURI)) {
          (participant.id = strapiMap.get(pURI).id),
            (participant.payment = strapiMap.get(pURI).receipt.driveFileUrl);
          participant.certification =
            strapiMap.get(pURI).certificate.driveFileUrl;
        }
        return participant;
      });
      // const filteredParticipants = participants.map(async function (
      //   participant
      // ) {
      //   const pURI = participant.uri;
      //   if (strapiMap.has(pURI)) {
      //     participant.payment = strapiMap.get(pURI).receipt.driveFileUrl;
      //     participant.certification =
      //       strapiMap.get(pURI).certificate.driveFileUrl;
      //   } else {
      //     try {
      //       // create new folder for participant
      //       const newParticipantFolder = (
      //         await drive.files.create({
      //           supportsAllDrives: true,
      //           supportsTeamDrives: true,
      //           fields: "id, name",
      //           requestBody: {
      //             mimeType: "application/vnd.google-apps.folder",
      //             name: `${participant.name} - ${uri}`,
      //             parents: [`${folderID}`],
      //           },
      //         })
      //       ).data;
      //       // create new entry in strapi
      //       const res = await strapi.services["participants"].create({
      //         participantURI: pURI,
      //         participantFolderId: newParticipantFolder.id,
      //         participantFolderName: newParticipantFolder.name,
      //         roundtable: roundtable.id,
      //       });
      //       return participant;
      //     } catch (error) {
      //       throw error;
      //     }
      //   }

      //   return participant;
      // });

      /***
       * Merge results from Roundtable and Participants together
       */
      const finalRes = {
        start: getFormattedDate(new Date(roundtableDetails.start_time)),
        end: getFormattedDate(new Date(roundtableDetails.end_time)),
        location: roundtableDetails.location.join_url,
        createdAt: roundtableDetails.created_at,
        participants: filteredParticipants,
        files: roundtableFiles,
      };

      return finalRes;
    } catch (error) {
      throw error;
    }
  },
};
