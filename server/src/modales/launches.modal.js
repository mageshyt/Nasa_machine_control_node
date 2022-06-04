const launches = new Map();

let latest_flight_number = 1;

const launch = {
  flightNumber: latest_flight_number,
  mission: "Kepler Exoplanet Archive",
  rocket: "FExplorer IS1",
  launch_date_utc: new Date("December 27,2030"),
  destination: "kepler-442 b",
  customers: ["NASA", "SpaceX", "Google", "ZTM"],
  upcoming: true,
  launch_success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

const AddNewLaunch = (launch) => {
  latest_flight_number++;
  launches.set(
    latest_flight_number,
    Object.assign(launch, {
      flightNumber: latest_flight_number,
      customers: ["LARA", "NASA"],
      upcoming: true,
      success: true,
    })
  );
};

module.exports = {
  getAllLaunches,
  AddNewLaunch,

};
