const express = require("express");

const path = require("path");

const cors = require("cors");

const app = express();

const planetsRouter = require("./routes/planets/planets.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(planetsRouter);
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app /
  get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });

module.exports = app;
