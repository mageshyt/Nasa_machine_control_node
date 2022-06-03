const express = require("express");

const path = require("path");

const cors = require("cors");

const app = express();

const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");

const launchRoutes = require("./routes/launches/launches.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//! get planets Routes
app.use(planetsRouter);

//! launches Route
app.use(launchRoutes);

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(morgan("combined"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname, "..", "public", "/index.html");
});

module.exports = app;
