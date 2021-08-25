import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";


// This example includes both:
// create permission for a user &
// upload file

// when uploading, since we have no cache nor permnant storage
// the client must stay inside the page, until we pop up a windows
// which says that the uplaod is done successfully.
export const getServerSideProps: GetServerSideProps = async (context) =>  {
    
    const auth = new google.auth.GoogleAuth({
        keyFile: 'server-credentials.json',
        scopes: ['https://www.googleapis.com/auth/drive']
    })
    
    const drive: drive_v3.Drive = google.drive({
        version: 'v3',
        auth,
    });

    const res = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder'",
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType)',
    });

    const files = res.data.files;
    if (files.length == 0) {
        console.log(res);
        return { props: {} }
    }

    return {
        props: { files }
    }
}

function GoogleExamplePage({ files }) { 

    // create a permission for a user
    const auth = new google.auth.GoogleAuth({
        keyFile: 'server-credentials.json',
        scopes: ['https://www.googleapis.com/auth/drive']
    })
    
    const drive: drive_v3.Drive = google.drive({
        version: 'v3',
        auth,
    })

    const perres = await drive.permissions.create({
        resource: {
            'type': 'user',
            'role': 'reader',
            'emailAddress': 'jiachengy1998@gmail.com'
        },
        fileId: files[0].id,
        fields: 'id, permissionDetails',
    })

    console.log(perres.permissionDetails)
    // end

    return (
        <text> "Hi" </text>
    )
}

export default GoogleExamplePage;