/* eslint-disable */
import React, { ChangeEvent } from "react";
import gnAxiosClient from "util/gnAxiosClient";

const SamUploadTest = () => {
  const [file, setFile] = React.useState(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files[0];
    console.log(file);
    if (file.size > 5000000) {
      return console.log("file too large");
    }
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("files", file); // NECESSARY
      // The subfolder name you want it to be in, defaults to ("App Uploads", others as subfolders)
      formData.append("path", "new folder test");
      // The below if we want to link the file to a record in the db
      // Make sure there's a media field in Strapi
      formData.append("ref", "Roundtables"); // Reference the collection
      formData.append("refId", "6134888055e59a59f4b9eac6"); // The exact record's ID
      formData.append("field", "image"); // The field in the record we want to assign this image to
      const res = await gnAxiosClient({
        url: "/upload",
        method: "post",
        data: formData,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileInput} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default SamUploadTest;
