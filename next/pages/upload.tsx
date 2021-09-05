import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getAllFiles } from "util/DriveController";

const upload = ({ files }) => {
  const [state, setState] = useState({
    file: null,
  });

  const handleClick = (e) => {
    if (e.target.name === "upload") {
      // console.log("he");
    }
  };

  const fileComps = [];
  files.forEach((file) => {
    fileComps.push(<p>{file.name}</p>);
  });

  return (
    <>
      <h1>Files</h1>
      {fileComps}
      <button name="upload" type="button" onClick={handleClick}>
        Upload
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getAllFiles();

  const { files } = res.data;
  if (files.length === 0) {
    return { props: {} };
  }

  return {
    props: { files },
  };
};

export default upload;
