import { google, drive_v3, Common } from "googleapis";
import { NextPage, GetServerSideProps } from "next";

export async function getServerSideProps(context) {
    
    const auth = new google.auth.GoogleAuth({
        keyFile: 'server-credentials.json',
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly']
    })
    
    const drive: drive_v3.Drive = google.drive({
        version: 'v3',
        auth,
    });

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

  