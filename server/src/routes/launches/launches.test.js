const request = require("supertest");

const app = require("../../app");

const { connect_to_mongo } = require("../../servers/mongo");
beforeAll(async () => {
  jest.setTimeout(6000);
  return await connect_to_mongo();
});
// afterEach(async (close) => {
//   await close_mongo();
// });

describe("Launches Api", () => {
  describe("Test Get /launches", () => {
    test("should return all launches", async () => {
      const response = await request(app).get("/launches");
      expect(response.status).toBe(200);
    });
  });

  // ! for post methods
  describe("Test Post /launches", () => {
    test("It should respond with status code 201", async () => {
      const newLaunch = {
        mission: "Going to Mars",
        rocket: "lara 43b",
        launch_date_utc: "May 27, 2024",
        destination: "Mars",
      };

      const launch_without_date = {
        mission: "Going to Mars",
        rocket: "lara 43b",
        destination: "Mars",
      };

      const response = await request(app)
        .post("/launches")
        .send(newLaunch)
        .expect(201)
        .expect("Content-Type", /json/);

      const data_to_check = new Date(newLaunch.launch_date_utc).valueOf();
      const responseData = new Date(response.body.launch_date_utc).valueOf();
      expect(data_to_check).toBe(responseData);
      expect(response.body).toMatchObject(launch_without_date);
    });

    //! missing filed
    test("it should catch missing required fields", async () => {
      const response = await request(app)
        .post("/launches")
        .send({
          mission: "Going to Mars",
          rocket: "lara 43b",
          destination: "Magesh Home Planets",
        })
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Please fill all the fields",
      });
    }),
      //! invalid date
      test("it should catch invalid date", async () => {
        const response = await request(app).post("/launches").send({
          mission: "Going to Mars",
          rocket: "lara 43b",
          destination: "Mars",
          launch_date_utc: "May Hello",
        });
        expect(response.body).toStrictEqual({
          error: "Please enter a valid date",
        });
      });
  });

  //! for abort
  describe("Test Delete /launches/:id", () => {
    test("It should respond with status code 200", async () => {
      const response = await request(app).delete("/launches/110");
      expect(response.status).toBe(200);
    });

    test("It should respond with status code 404", async () => {
      const response = await request(app).delete("/launches/100");
      expect(response.status).toBe(400);
    });
  });
});
