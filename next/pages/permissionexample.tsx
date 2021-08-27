import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";

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
    
    console.log(files[0].name)

    const permission = {
        'type': 'user',
        'role': 'reader',
        'emailAddress': 'misaki.cy@gmail.com'
    }
    const perres = await drive.permissions.create({
        requestBody: permission,
        fileId: files[0].id,
        fields: 'type, emailAddress',
    })
    console.log(perres.data)

    const perres_data = perres.data
    console.log(perres_data)

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
    var e = perres_data.emailAdress
    return (
        <text> Permission given to {`${e}`} with type {`${t}`} </text>
    )
}

export default PermissionExamplePage;