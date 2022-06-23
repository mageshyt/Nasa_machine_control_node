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
app.use(morgan("combined"));
app.use(express.json());
//! get planets Routes
app.use("/planets", planetsRouter);
//! launches Routes
app.use("/launches", launchRoutes);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "/index.html"));
});

module.exports = app;
