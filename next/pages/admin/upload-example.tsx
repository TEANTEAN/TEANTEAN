/* eslint-disable */
import { Button } from "@material-ui/core";
import UploadDialog from "components/Upload/UploadDialog";
import { useSession } from "next-auth/client";
import React from "react";

const SamUploadTest = () => {
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

  const [session, status] = useSession();

  return (
    <>
      <Button onClick={() => setOpenUploadDialog(true)}>Open dialog</Button>
      {openUploadDialog && (
        <UploadDialog
          open={openUploadDialog}
          onClose={() => setOpenUploadDialog(false)}
          onUploadComplete={() => {}}
          allowedFileTypes={[".png"]}
          // All of these should be based on other data (you may have to fetch these from Strapi)
          collectionName="roundtable-series"
          driveFolderName="test upload dialog folder (roundtable-series)"
          recordId="613230c9a104701f199eb6ff" // the exact record id to attach this file to
          recordFieldName="image"
        />
      )}
    </>
  );
};

export default SamUploadTest;
