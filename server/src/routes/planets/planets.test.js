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

describe("Test Api", () => {
  describe("Test Get /planets", () => {
    test("It should respond with status code 200", async () => {
      const response = await request(app).get("/planets");
      expect(response.status).toBe(200);
    });
  });
});
