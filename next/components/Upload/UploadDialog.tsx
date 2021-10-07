import Uppy, { UploadResult } from "@uppy/core";
import React from "react";
import { Dashboard, useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Dialog from "@material-ui/core/Dialog";
import { useSession } from "next-auth/client";

export interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUploadComplete: (result: UploadResult) => void;
  // sessionJwt: string;
  driveFolderName: string;
  collectionName:
    | "certificate"
    | "organisation"
    | "roundtable-series"
    | "payment"
    | "roundtables"
    | "participants";
  recordId: string;
  recordFieldName: string;
  allowedFileTypes: string[];
}

function UploadDialog(props: UploadDialogProps) {
  const [session] = useSession();

  const headers = () => ({
    authorization: `Bearer ${session.jwt}`,
  });

  const uppy = useUppy(() =>
    new Uppy({
      meta: {
        path: props.driveFolderName,
        ref: props.collectionName,
        refId: props.recordId,
        field: props.recordFieldName,
        // source: "content-manager", // For any tables created by
      },
      restrictions: {
        maxFileSize: 10485760, // 10mb
        allowedFileTypes: [".png"],
        maxNumberOfFiles: 1,
      },
    })
      .use(XHRUpload, {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        formData: true,
        headers,
      })
      .on("file-added", (file) => {
        console.log("added file: ", file.data);
        uppy.setMeta({ files: file.data });
      })
      .on("complete", props.onUploadComplete)
  );

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Dashboard uppy={uppy} />
    </Dialog>
  );
}

export default UploadDialog;
