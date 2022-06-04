const Api_url = "http://localhost:8000";

const httpGetPlanets = async () => {
  // TODO: Once API is ready.
  const response = await fetch(`${Api_url}/planets`);
  const data = await response.json();
  return data;
};

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${Api_url}/launches`);

  const data = await response.json();
  data.sort((a, b) => a.flightNumber - b.flightNumber);
  return data;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
