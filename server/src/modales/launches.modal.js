const launchDataBase = require("./launches.mongo");

const launches = new Map();
let latest_flight_number = 100;

const set_launches = async (launch) => {
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
        console.log("Inserted 🚀");
      });
  } catch (err) {
    console.log(err);
  }
};

const getAllLaunches = async () => {
  return await launchDataBase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

const AddNewLaunch = (launch) => {
  latest_flight_number++;
  const newLaunch = Object.assign(launch, {
    flightNumber: latest_flight_number,
    customers: ["LARA", "NASA"],
    upcoming: true,
    success: true,
  });

  set_launches(newLaunch);
  console.log("Add New Launch 🚀", launches);
};

const abortLaunch = (id) => {
  console.log("Abort Launch 🔥", id);
  //! remove the launch
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

const Is_launch_exists = (id) => {
  return launches.has(id);
};

module.exports = {
  getAllLaunches,
  AddNewLaunch,
  abortLaunch,
  Is_launch_exists,
};
