const launches = require("../../modales/launches.modal");

function httpGetAllLaunches(req, res) {
  console.log("Launches 😀");
  return res.status(200).json(launches.getAllLaunches());
}

function httpSetLaunches(req, res) {
  if (!req.body) {
    return res.status(400).send("<h2> There is a Problem 😞</h2>").json();
  }
  const launch = req.body;
  console.log("Launches ❤️‍🔥", launch);
  //! If  anything is missed
  if (
    !launch.launch_date_utc ||
    !launch.mission ||
    !launch.destination ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Please fill all the fields",
    });
  }

  launch.launch_date_utc = new Date(launch.launch_date_utc);

  if (isNaN(launch.launch_date_utc)) {
    return res.status(400).json({
      error: "Please enter a valid date",
    });
  }
  launches.AddNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpSetLaunches,
};
