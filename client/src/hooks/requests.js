const Api_url = "http://localhost:8000";

const httpGetPlanets = async () => {
  const response = await fetch(`${Api_url}/planets`);
  const data = await response.json();
  return data;
};

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${Api_url}/launches`);

  const data = await response.json();
  data.sort((a, b) => a.flightNumber - b.flightNumber);
  return data;
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  try {
    const response = await fetch(`${Api_url}/launches`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json", //! content type
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // DONE: Once API is ready.
  try {
    const response = await fetch(`${Api_url}/launches/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {}
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
