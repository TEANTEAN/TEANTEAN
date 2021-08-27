import React from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/client";

const Dashboard: NextPage = () => {
  const [session] = useSession();

  return (
    <div>
      <h1>Hello {`${session?.user?.name}`}</h1>
      <h2>Role: {`${session?.user?.role}`}</h2>
    </div>
  );
};

export default Dashboard;
