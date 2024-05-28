require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT; // port number is set in .env file (port3000)
const API_KEY = process.env.API_KEY; // insert api key in to .env file. Its assigned to API_KEY variable in .env file.

const weatherStationsURL =
  "https://data.gov.lv/dati/lv/api/3/action/datastore_search?resource_id=c32c7afd-0d05-44fd-8b24-1de85b4bf11d";

//List of all stations with two properties: STATION_ID and NAME
app.get("/stations", async (req, res) => {
  try {
  } catch (error) {}
});

//Get station details by STATION_ID (with all data fields)
app.get("/stations/:id", async (req, res) => {
  try {
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
