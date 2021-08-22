import LoadingButton from "components/LoadingButton";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import gnAxiosClient from "util/gnAxiosClient";

const AxiosClientTestPage: NextPage = () => {
  const [fetchRoundtables, setFetchRoundtables] = React.useState(false);

  const roundtables = useQuery(
    "get-roundtables",
    async () => (await gnAxiosClient.get<Roundtable[]>("roundtables")).data,
    {
      enabled: fetchRoundtables,
    }
  );

  return (
    <>
      <LoadingButton
        isloading={roundtables.isFetching}
        color="primary"
        onClick={() => setFetchRoundtables(true)}
      >
        Get Roundtables
      </LoadingButton>
      {roundtables.isSuccess &&
        roundtables.data.map((roundtable) => (
          <div>{`${roundtable.id} : ${roundtable.zoomLink}`}</div>
        ))}
      {roundtables.isError && <div>{`${roundtables.error}`}</div>}
    </>
  );
};

export default AxiosClientTestPage;
