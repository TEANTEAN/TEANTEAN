import LoadingButton from "components/LoadingButton";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import gnAxiosClient from "util/gnAxiosClient";

const AxiosClientTestPage: NextPage = () => {
  const [fetchAllDriveFiles, setFetchAllDriveFiles] = React.useState(false);
  const [fetchFilesInFolder, setFetchFilesInFolder] = React.useState(false);
  const [fetchFileDetails, setFetchFileDetails] = React.useState(false);

  const allDriveFiles = useQuery(
    "get-all-drive-files",
    async () => (await gnAxiosClient.get<DriveFile[]>("drive")).data,
    {
      enabled: fetchAllDriveFiles,
      onSettled: () => setFetchAllDriveFiles(false),
    }
  );

  const filesInFolder = useQuery(
    "get-files-in-folder-new-folder-test",
    async () =>
      (
        await gnAxiosClient.get<DriveFile[]>(
          "drive?parentFolderName=new folder test"
        )
      ).data,
    {
      enabled: fetchFilesInFolder,
      onSettled: () => setFetchFilesInFolder(false),
    }
  );

  const fileDetails = useQuery(
    "get-drive-file-hihihi.png",
    async () =>
      (await gnAxiosClient.get<DriveFile[]>("drive?fileName=hihihi.png")).data,
    {
      enabled: fetchFileDetails,
      onSettled: () => setFetchFileDetails(false),
    }
  );

  return (
    <>
      <h3>
        Note: Please make sure you have enabled drive permissions in strapi
      </h3>
      <p>Error code 403 is a permission error from Strapi</p>

      <LoadingButton
        isloading={allDriveFiles.isFetching}
        color="primary"
        onClick={() => setFetchAllDriveFiles(true)}
      >
        Get All Drive Files
      </LoadingButton>
      {allDriveFiles.isSuccess &&
        allDriveFiles.data.map((driveFile) => (
          <div>{`${driveFile.id} : ${driveFile.name} (${driveFile.url})`}</div>
        ))}
      {allDriveFiles.isError && <div>{`${allDriveFiles.error}`}</div>}
      <LoadingButton
        isloading={filesInFolder.isFetching}
        color="primary"
        onClick={() => setFetchFilesInFolder(true)}
      >
        Get All Files In Folder: new folder test
      </LoadingButton>
      {filesInFolder.isSuccess && "Files in folder: new folder test"}
      {filesInFolder.isSuccess &&
        filesInFolder.data.map((driveFile) => (
          <div>{`${driveFile.id} : ${driveFile.name} (${driveFile.url})`}</div>
        ))}
      {filesInFolder.isError && <div>{`${filesInFolder.error}`}</div>}
      <LoadingButton
        isloading={fileDetails.isFetching}
        color="primary"
        onClick={() => setFetchAllDriveFiles(true)}
      >
        Get file: hihihi.png
      </LoadingButton>
      {fileDetails.isSuccess &&
        fileDetails.data.map((driveFile) => (
          <div>{`${driveFile.id} : ${driveFile.name} (${driveFile.url})`}</div>
        ))}
      {fileDetails.isError && <div>{`${fileDetails.error}`}</div>}
    </>
  );
};

export default AxiosClientTestPage;
