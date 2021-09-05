import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";
import React, { useState } from "react";
import { getAllFiles, makeFolder, uploadFile } from "util/DriveController";

export const getServerSideProps: GetServerSideProps = async (context) => {
  /** *
   * Retrive list,
   * 'q' is the regex pattern. Here I specify that only get mimeType=video
   * 'pageSize' is the number of pages should be looped
   * 'fields' specifies what should be included in response,
   *        here I only want 'nextPageToken' (for looping)
   *                      and 'files'.
   * 'files' is the File Resource type.
   * Use 'files(xx, yy, zz, ...)' to specify what should be included inside response
   *
   * 'res' is the response object, it is a full http response json.
   * the acquired data is retrieved by 'res.data'
   */
  const res = await getAllFiles();
  // const res2 = await uploadFile();

  // console.log(res2);
  const { files } = res.data;
  if (files.length === 0) {
    return { props: {} };
  }

  return {
    props: { files },
  };
};

/** *
 * NOTE!!! the parameter passed here MUST match
 * with the name that is specified in 'props:{ xxx }'
 */
const ViewPage = ({ files }) => {
  const [state, setState] = useState({
    file: null,
  });
  console.log(files);
  const fileComps = [];
  files.forEach((file) => {
    fileComps.push(<p>{file.name}</p>);
  });
  return (
    <>
      <h1>Files</h1>
      {fileComps}
      <input type="file" />
      <button
        type="button"
        disabled={state.file}
        onClick={console.log("upload")}
      >
        Upload
      </button>
    </>
  );
};

export default ViewPage;
