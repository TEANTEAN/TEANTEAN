import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { GeneralButton } from "components/Buttons";

class Series {
  name: String;

  scheduling_url: String;
}

type Props = {
  serieses: Array<Series>;
};

const Gallery = ({ serieses }: Props) => (
  <>
    <Head>
      <title>Gallery</title>
    </Head>
    <Image src="/gn-logo.png" width={310} height={99} alt="genyus logo" />
    <h1>Current Roundtables</h1>
    {serieses.map((series) => (
      <div>
        <p>{series.name}</p>
        <GeneralButton href={series.scheduling_url.toString()}>
          Book
        </GeneralButton>
      </div>
    ))}
    <h1>Past Roundtables</h1>
  </>
);

const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `https://api.calendly.com/event_types?user=${process.env.CALENDLY_USER_ID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  console.log(response);

  const serieses = response.collection.map((s) => {
    const singleSeries = {
      name: s.name,
      scheduling_url: s.scheduling_url,
    };
    return singleSeries;
  });

  console.log(serieses);

  return { props: { serieses } };
};

export default Gallery;
export { getStaticProps };
