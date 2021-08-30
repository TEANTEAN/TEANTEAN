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
        scopes: ['https://www.googleapis.com/auth/drive']
    })
    
    const drive: drive_v3.Drive = google.drive({
        version: 'v3',
        auth,
    });

    /***
     * Retrive list,
     * 'q' is the regex pattern. Here I specify that only get the folder type
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
        q: "mimeType='application/vnd.google-apps.folder'",
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType)',
    });

    const files = res.data.files;
    // no files means no folders here
    if (files.length == 0) {
        console.log(res);
        return { props: {} }
    }
    
    console.log(files[0].name)


    const email = 'misaki.cy@gmail.com'
    /***
     * detaile of the requestBody please read API documentation.
     * 'fileID' is the id of the file/folder that want to be given with permissions
     * 'fileds' specifies what should be included in response
     */
    const perres = await drive.permissions.create({
        requestBody: {
        'type': 'user',
        'role': 'reader',
        'emailAddress': email
    },
        fileId: files[0].id,
        fields: 'type, emailAddress',
        sendNotificationEmail: false, // must include this to avoid reaching api request limit.
    })

    const perres_data = perres.data

    return {
        props: { perres_data }
    }
}

function PermissionExamplePage({ perres_data }) { 
    console.log(perres_data)

    if (perres_data == null) {
        return (<text> No permission given </text>)
    }

    var t = perres_data.type
    var e = perres_data.emailAddress
    return (
        <text> Permission given to {`${e}`} with type {`${t}`} </text>
    )
}

export default PermissionExamplePage;