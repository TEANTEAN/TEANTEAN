"use strict";
const { drive } = require("../../../util/GoogleDrive");

// GET /drive
module.exports = {
  async find(ctx) {
    try {
      let parentId;
      if (ctx.request?.query?.parentFolderName) {
        const res = await drive.files.list({
          q: `mimeType = 'application/vnd.google-apps.folder' and name = '${ctx.request?.query?.parentFolderName}'`,
        });
        if (res.data.files && res.data.files.length > 0) {
          parentId = res.data.files[0].id;
        } else return ctx.send([]);
      }

      let q = "";
      if (parentId && ctx.request?.query?.fileName) {
        q = `'${parentId}' in parents and name = '${ctx.request?.query?.fileName}'`;
      } else if (parentId) {
        q = `'${parentId}' in parents`;
      } else if (ctx.request?.query?.fileName) {
        q = `name = '${ctx.request?.query?.fileName}'`;
      }
      console.log("q: ", q);
      try {
        const res = await drive.files.list({
          q: q,
        });
        const files = res.data.files;
        // Attach folder link to any folders
        for (let i = 0; i < files.length; i++) {
          if (files[i].mimeType === "application/vnd.google-apps.folder") {
            files[
              i
            ].url = `https://drive.google.com/drive/folders/${files[i].id}`;
          } else {
            files[i].url = `https://drive.google.com/file/d/${files[i].id}`;
          }
        }
        ctx.send(res.data.files);
      } catch (err) {
        console.log(err);
        ctx.send([]);
      }
    } catch (err) {
      throw err;
    }
  },

  // async findOne(ctx) {
  //   const id = ctx.request?.query?.id;
  //   const res = await drive.files.get();
  // },
};
