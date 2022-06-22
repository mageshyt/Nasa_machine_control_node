const request = require("supertest");
const app = require("../../app");

describe("To get eh planets", () => {
  test("It should respond with status code 200", async () => {
    const response = await request(app).get("/planets");
    expect(response.status).toBe(200);
  });
});


