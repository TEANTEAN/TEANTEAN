const getSeries = async () => {
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

  return response;
};

export default getSeries;
