const axios = require("axios");
const { set_launches } = require("./launches.modal");

const SPACE_X_API = "https://api.spacexdata.com/v4/launches/query";

const populateData = async (data) => {
  console.log("Downloading Launch Data 🔥");
  const launchDocs = await axios
    .post(SPACE_X_API, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: { name: 1 },
          },
          {
            path: "payloads",
            select: { customers: 1 },
          },
        ],
      },
    })
    .then((res) => res.data.docs);
  for (const launchDoc of launchDocs) {
    const { flight_number, name, rocket } = launchDoc;
    const { date_local, payloads, success, upcoming } = launchDoc;

    const launch = {
      flightNumber: flight_number,
      mission: name,
      rocket: rocket.name,
      launch_date_utc: new Date(date_local),
      upcoming: upcoming,
      success: success,
      customers: payloads.map((payload) => payload.customers).flat(),
    };
    console.log(` ${flight_number} Saving Launch Data 🔥`, name);
    await set_launches(launch).then("launch saved");
  }
  return launchDocs;
};

module.exports = { populateData };

//! Example of how to use this function
const launch = {
  flightNumber: 10, //! flight_number
  mission: "Kepler Exoplanet Archive", //! name
  rocket: "FExplorer IS1", //! rocket.name
  launch_date_utc: new Date("December 27,2030"), //! date_local
  destination: "kepler-442 b",
  customers: ["NASA", "SpaceX", "Google", "ZTM"],
  upcoming: true, //! upcoming
  launch_success: true, //! success
};
