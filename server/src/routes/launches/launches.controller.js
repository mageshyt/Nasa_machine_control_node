const launches = require("../../modales/launches.modal");

function httpGetAllLaunches(req, res) {
  console.log("Launches 😀");
  return res.status(200).json(launches.getAllLaunches());
}

function httpSetLaunches(req, res) {
  const launch = req.body;

  launch.launch_date_utc = new Date(launch.launch_date_utc);

  launches.AddNewLaunch(launch);

  return res.send(201).join(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpSetLaunches,
};
