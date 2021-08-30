import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";

/***
 * A NOTE about authentication for downloading.
 * For a file inside Google Drive,
 * everyone can view it after the server account retrieve it from the Google Drive.
 * However, for downloading, since we are directly initiate the download link from Google Drive,
 * only the users that have permissions can download it.
 * 
 * So before testing out this page, navigate to the "permissionexample.tsx",
 * and change the value of "email" const to your email address
 * then run the permission example page
 * then run the download page. :)
 */
export async function getServerSideProps(context) {
    
    /**
     * Set up authentication & drive object
     * keyFile is the credential file
     * scopes are the level of authentication.
     */
    const auth = new google.auth.GoogleAuth({
        keyFile: 'server-credential.json',
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly']
    })
    
    const drive: drive_v3.Drive = google.drive({
        version: 'v3',
        auth,
    });

    /***
     * The following script handles error,
     * but getServerSideProps will never return the res / files
     * Basically the callback funtcion gets ignored?
     * Same reason applies to other examples that are related to Google Drive
     */
    // await drive.files.list({
    //     q: "mimeType='video/mp4'",
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name, webContentLink)',
    // }), function (err, res) {
    //     if (err) {
    //         return {
    //             props: {}
    //         }
    //     } else {
    //         var files = res.data.files;
    //         return {
    //             redirect: {
    //                 destination: files[0].webContentLink
    //             }
    //         }
    //     }
    // }

    /***
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
    const res = await drive.files.list({
        q: "mimeType='video/mp4'",
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, webContentLink)',
    });

    console.log(0);
    console.log(res);

    const files = res.data.files;
    if (files.length == 0) {
        console.log(1);
        console.log(res);
        return { props: {} }
    }
    console.log(2)
    console.log(files)

    return {
        redirect: {
            destination: files[0].webContentLink
        },
        // props: { files }
    }
}

function DownloadPage({ files }) {  

    console.log(3);
    console.log(files)

    if (files === undefined) {
        return (<text> 'No files found' </text>)
    }

    var url = files[0].webContentLink
    return (
        <text> {url} </text>
    );
};



export default DownloadPage;

  