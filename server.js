require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT; // port number is set in .env file (port3000)
const API_KEY = process.env.API_KEY; // insert api key in to .env file. Its assigned to API_KEY variable in .env file.

const weatherStationsURL =
  "https://data.gov.lv/dati/lv/api/3/action/datastore_search?resource_id=c32c7afd-0d05-44fd-8b24-1de85b4bf11d";

app.use(express.json());
// Middleware for authentication
app.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    if (bearerToken === API_KEY) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

// Get all stations by STATION_ID and NAME
app.get("/stations", async (req, res) => {
  try {
    const response = await axios.get(weatherStationsURL);
    const stations = response.data.result.records.map((station) => ({
      Station_id: station.STATION_ID,
      Name: station.NAME,
    }));
    res.json(stations);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

// Get station details by STATION_ID (with all data fields)
app.get("/stations/:id", async (req, res) => {
  try {
    const response = await axios.get(weatherStationsURL);
    const station = response.data.result.records.find(
      (station) => station.STATION_ID === req.params.id
    );
    if (station) {
      res.json(station);
    } else {
      res.status(404).send("Station not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
