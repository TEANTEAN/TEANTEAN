import { signOut, getSession, useSession } from "next-auth/client";
import withAuth from "./components/withAuth"

export default function dashboard ({person, role}) {
    const [session, loading] = useSession();
    return (<div>
        <div>
        {session && <>
          <button onClick={() => signOut()}>Sign out</button>
        </>}
      </div>
        <h1>Hello {`${person}`}</h1>
        <h2>Role: {`${role}`}</h2>
    </div>)
}

/** Auth with data requirements */
// Auth token can be retrieved from the session data
export const getServerSideProps = withAuth(async (context) => {
    let {req} = context
    const session = await getSession({req});
    
    let person = session["user"]["name"];
    let role = session["user"]["role"];
    return {props: {person, role}}
});