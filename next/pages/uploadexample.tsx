import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) =>
  // /**
  //  * Set up authentication & drive object
  //  * keyFile is the credential file
  //  * scopes are the level of authentication.
  //  */
  // const auth = new google.auth.GoogleAuth({
  //     keyFile: 'server-credential.json',
  //     scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly']
  // })

  // const drive: drive_v3.Drive = google.drive({
  //     version: 'v3',
  //     auth,
  // });

  // if (metadata) {

  // }

  ({
    props: {},
  });

/** *
 * Tutorial from: https://blog.greenroots.info/10-useful-html-file-upload-tips-for-web-developers
 * https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
 */

function returnFileSize(number) {
  if (number < 1024) {
    return `${number}bytes`;
  }
  if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(2)}KB`;
  }
  if (number >= 1048576) {
    return `${(number / 1048576).toFixed(2)}MB`;
  }
}

/** *
 * NOTE!!! the parameter passed here MUST match
 * with the name that is specified in 'props:{ xxx }'
 */
function UploadPage({ res }) {
  // const router = useRouter();
  // const [isUploading, setIsUploading] = React.useState(false);

  // const refreshData = () => {
  //     router.replace(router.asPath);
  //     setIsUploading(true);
  // };

  // React.useEffect(() => {
  //     setIsUploading(false);
  // }, [res]);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    const file = files[0];
    console.log("files", file);

    // const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
    //     method: 'POST',
    //     body:
    // })

    let msg = "";
    const { size } = file;
    if (size >= 1024 * 1024 * 5) {
      msg = `<span style="color:red;">The allowed file size is 5MB. The file you are trying to upload is of ${returnFileSize(
        size
      )}</span>`;
    } else {
      msg = `<span style="color:green;"> The file ${
        file.name
      } with size ${returnFileSize(size)} and type ${
        file.type
      } has been uploaded successfully. </span>`;
    }

    const feedback = document.getElementById("feedback");
    feedback.innerHTML = msg;
  };

  return (
    <div>
      <input type="file" id="uploader" onChange={onChange} />
      <div id="feedback" />
    </div>
  );
}

export default UploadPage;
