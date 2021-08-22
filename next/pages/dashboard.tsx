import React from "react";
import { NextPage } from "next";
import { signOut } from "next-auth/client";
import withAuth, { WithAuthHook } from "components/withAuth";

const Dashboard: NextPage = () => {
  const { session, haveAuthenticated }: WithAuthHook = withAuth({
    redirectTo: "/login",
  });
  if (!session) {
    return <h1>Loading...</h1>;
  }
  if (session && haveAuthenticated()) {
    return (
      <div>
        <div>
          {session && (
            <>
              <button type="button" onClick={() => signOut()}>
                Sign out
              </button>
            </>
          )}
        </div>
        <h1>Hello {`${session.user.name}`}</h1>
        <h2>Role: {`${session.user.role}`}</h2>
      </div>
    );
  }
  return <p>Redirecting...</p>;
};

export default Dashboard;
