import React from "react";
import Image from "next/image";
import { getDriveImageAsString } from "util/DriveController";

export async function getStaticProps() {
  let imageBuffer;
  try {
    const driveImageAsBase64String = await getDriveImageAsString(
      "1GFtekWD0tSI5N7dG3GOD1WSikmGAxQF-"
    );
    imageBuffer = driveImageAsBase64String;
  } catch (err) {
    console.log(err);
    imageBuffer = "";
  }

  return {
    props: {
      imageBuffer,
    }, // will be passed to the page component as props
  };
}

interface StaticTestProps {
  imageBuffer: string; // base64 string representation of image
}

const staticTest = (props: StaticTestProps) => {
  if (props.imageBuffer) {
    return (
      <Image
        // Make sure the prefix is there to decode the base64 string
        src={`data:image/png;base64,${props.imageBuffer}`}
        width={400}
        height={200}
      />
    );
  }
  return <>Error building page, shit</>;
};

export default staticTest;
