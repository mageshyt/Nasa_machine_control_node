const launches = require("../../modales/launches.modal");

async function httpGetAllLaunches(req, res) {
  console.log("Launches 😀");
  return res.status(200).json(await launches.getAllLaunches());
}

//! set launches
async function httpSetLaunches(req, res) {
  if (!req.body) {
    return res.status(400).send("<h2> There is a Problem 😞</h2>").json();
  }
  const launch = req.body;
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
  //! shedule the launch
  const result = await launches.sheduleNewLaunch(launch);
  console.log("result", result);
  return res.status(201).json(result);
}
//! Abort the launch
const http_abort_the_launch = async (req, res) => {
  const id = parseInt(req.params.id);

  if (!launches.Is_launch_exists(id)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await launches.abortLaunch(id);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    success: "Launch aborted",
    ok: true,
  });
};

module.exports = {
  httpGetAllLaunches,
  httpSetLaunches,
  http_abort_the_launch,
};
