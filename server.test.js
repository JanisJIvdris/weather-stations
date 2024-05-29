require("dotenv").config();
const request = require("supertest");
const express = require("express");
const axios = require("axios");
const app = require("./server");
jest.mock("axios");

const API_KEY = process.env.API_KEY;
const weatherStationsURL =
  "https://data.gov.lv/dati/lv/api/3/action/datastore_search?resource_id=c32c7afd-0d05-44fd-8b24-1de85b4bf11d";

describe("Server Endpoints", () => {
  // Mock authentication header
  const authHeader = `Bearer ${API_KEY}`;

  // Mock data for the tests
  const mockStationsData = {
    result: {
      records: [
        { STATION_ID: "1", NAME: "Station 1" },
        { STATION_ID: "2", NAME: "Station 2" },
      ],
    },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockStationsData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all stations", async () => {
    const response = await request(app)
      .get("/stations")
      .set("Authorization", authHeader);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { Station_id: "1", Name: "Station 1" },
      { Station_id: "2", Name: "Station 2" },
    ]);
  });

  it("should return station details by STATION_ID", async () => {
    const response = await request(app)
      .get("/stations/1")
      .set("Authorization", authHeader);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ STATION_ID: "1", NAME: "Station 1" });
  });

  it("should return 404 if station not found", async () => {
    const response = await request(app)
      .get("/stations/3")
      .set("Authorization", authHeader);

    expect(response.status).toBe(404);
    expect(response.text).toBe("Station not found");
  });

  it("should return 403 if no auth header is provided", async () => {
    const response = await request(app).get("/stations");

    expect(response.status).toBe(403);
  });

  it("should return 403 if auth header is invalid", async () => {
    const response = await request(app)
      .get("/stations")
      .set("Authorization", "Bearer invalidkey");

    expect(response.status).toBe(403);
  });

  it("should return 500 if there is an error fetching data", async () => {
    axios.get.mockRejectedValue(new Error("Fetching error"));

    const response = await request(app)
      .get("/stations")
      .set("Authorization", authHeader);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Error fetching data");
  });
});
