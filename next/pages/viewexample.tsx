import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) =>  {

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
        fields: 'nextPageToken, files(id, name, webViewLink)',
        // fields: 'nextPageToken, files(id, name)',
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
        props: { files }
    }
}

/***
 * NOTE!!! the parameter passed here MUST match
 * with the name that is specified in 'props:{ xxx }'
 */
function ViewPage({ files }) {  

    console.log(3);
    console.log(files)

    if (files === undefined) {
        return (<text> 'No files found' </text>)
    }

    var url = files[0].webViewLink.replace('/view?usp=drivesdk', '/preview')
    console.log(url)
    return (
        <iframe 
        src={url}
        width="640" height="480" allow="autoplay">

        </iframe>
    );
};



export default ViewPage;

  