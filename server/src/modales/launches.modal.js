const launches = new Map();

const launch = {
  flightNumber: 1,
  mission: "Kepler Exoplanet Archive",
  rocket: "FExplorer IS1",
  launch_date_utc: new Date("December 27,2030"),
destination: "kepler-442 b",
  customers: ["NASA", "SpaceX", "Google", "ZTM"],
  upcoming: true,
  launch_success: true,
};

launches.set(launch.flightNumber, launch);

module.exports =  launches ;
