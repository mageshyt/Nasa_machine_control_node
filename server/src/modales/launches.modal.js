const launchDataBase = require("./launches.mongo");
const { planets } = require("./planets.mongo");
const launches = new Map();
let latest_flight_number = 100;
const default_flight_number = 100;
//! to check the planet is exist or not
const Is_launch_exists = async (name) => {
  // console.log("Is_launch_exists 🔥", name);
  return await planets.findOne({ KeplerName: name });
};

const set_launches = async (launch) => {
  const { destination } = launch;
  // console.log("Destination 🔥", destination);
  if (!(await Is_launch_exists(destination))) {
    throw new Error("No Planet Found");
  }

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
const getAllLaunches = async () => {
  return await launchDataBase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

module.exports = {
  getAllLaunches,
  sheduleNewLaunch,
  abortLaunch,
  Is_launch_exists,
};
