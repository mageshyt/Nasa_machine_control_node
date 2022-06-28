// const { populateData } = require("./launches.modal.utlis");
const { default: axios } = require("axios");
const launchDataBase = require("./launches.mongo");
const { planets } = require("./planets.mongo");

const default_flight_number = 100;
//! to check the planet is exist or not
const Is_launch_exists = async (name) => {
  // console.log("Is_launch_exists 🔥", name);
  return await planets.findOne({ KeplerName: name });
};

const set_launches = async (launch) => {
  // const { destination } = launch;
  // console.log("Destination 🔥", destination);

  try {
    await launchDataBase
      .updateOne(
        {
          flightNumber: launch.flightNumber,
        },
        launch,
        { upsert: true }
      )
      .then((res) => {
        console.log("Inserted 🚀", res);
      });
  } catch (err) {
    console.log(err);
  }
  return launch;
};

//! to get the latest flight number
const getLatestFlight = async () => {
  const res = await launchDataBase
    .findOne(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort("-flightNumber");
  console.log("getLatestFlight 🔥", res);
  if (!res) return default_flight_number;

  return res.flightNumber;
};

const sheduleNewLaunch = async (launch) => {
  const latest_flight_number = (await getLatestFlight()) + 1;
  if (!(await Is_launch_exists(launch.destination))) {
    throw new Error("No Planet Found");
  }
  const newLaunch = Object.assign(launch, {
    customers: ["LARA", "NASA", "ZTM"],
    upcoming: true,
    success: true,
    flightNumber: latest_flight_number,
  });
  return await set_launches(newLaunch);
};

//! to abort the launch
const abortLaunch = async (id) => {
  console.log("Abort Launch 🔥", id);
  //! remove the launch
  const aborted = await launchDataBase.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted?.modifiedCount == 1;
};
//! to get all the launches
const getAllLaunches = async (limit, skip) => {
  return await launchDataBase
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .skip(skip)
    .limit(limit);
};

const findLaunch = async (filter) => {
  return await launchDataBase.findOne(filter);
};

const SPACE_X_API = "https://api.spacexdata.com/v4/launches/query";

const populateData = async (data) => {
  console.log("Downloading Launch Data 🔥");
  const response = await axios.post(SPACE_X_API, {
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
  });
  if (response.status !== 200) {
    console.log("Problem in downloading data 🔥");
    throw new Error("Problem in downloading data 🔥");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const { flight_number, name, rocket } = launchDoc;
    const { date_local, payloads, success, upcoming } = launchDoc;

    const launch = {
      flightNumber: flight_number,
      mission: name,
      rocket: rocket.name,
      launch_date_utc: new Date(date_local),
      upcoming: upcoming,
      launch_success: success,
      customers: payloads.map((payload) => payload.customers).flat(),
    };
    console.log(` ${flight_number} Saving Launch Data 🔥`, name);
    await set_launches(launch).then("launch saved");
  }
  return launchDocs;
};
const loadLaunchDate = async () => {
  const result = await findLaunch({
    flight_number: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (result) {
    console.log("Launch Date Loaded 🔥");
  } else {
    await populateData();
  }
};

module.exports = {
  getAllLaunches,
  sheduleNewLaunch,
  abortLaunch,
  Is_launch_exists,
  loadLaunchDate,
  set_launches,
};
