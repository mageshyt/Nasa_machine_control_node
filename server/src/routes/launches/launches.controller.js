const launches = require("../../modales/launches.modal");

function httpGetAllLaunches(req, res) {
  console.log("Launches 😀");
  return res.status(200).json(launches.getAllLaunches());
}

function httpSetLaunches(req, res) {
  if (!req.body) {
    return res.status(400).send("<h2> U have missed something 😞</h2>").json();
  }
  const launch = req.body;

  launch.launch_date_utc = new Date(launch.launch_date_utc);
  console.log("Launches 🚀", launch, {
    data: launch.launch_date_utc,
  });

  launches.AddNewLaunch(launch);

  return res.send(201).json({ launch });
}

module.exports = {
  httpGetAllLaunches,
  httpSetLaunches,
};
