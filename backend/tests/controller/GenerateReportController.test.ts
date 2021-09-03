import "mocha";
// @ts-ignore
import chai, { expect } from "chai";
// @ts-ignore
import chaiHttp from "chai-http";
import app from "../../src/server";
import { GenerateReporterResponse } from "../../src/contract/GenerateReporter/GenerateReporterResponse";
import { GenerateReportRequest } from "../../src/contract/GenerateReporter/GenerateReporterRequestBody";

chai.use(chaiHttp);
chai.should();

describe("GenerateReporter", () => {
  it.skip("should return 200 and report data when post data correct", async () => {
    const response = await chai
      .request(app)
      .post("/generateReporter")
      .send(new GenerateReportRequest());
    expect(response.status).equal(200);
    expect(response.body).to.deep.equal(new GenerateReporterResponse());
  });

  it("should return 400 when request lack required data", async () => {
    const response = await chai.request(app).post("/generateReporter").send({});
    expect(response.status).equal(400);
  });

  it("should return 200 when request is valid", async () => {
    const mockData = {
      "metrics": ["Lead time for changes"],
      "startTime": 1630252800000,
      "endTime": 1630511999000,
      "considerHoliday": false,
      "pipeline": {"type": "BuildKite", "token": "9627ef784bd5dac24256bc7d382d6af2ce77a781", "deployment": []},
      "codebaseSetting": {
        "type": "Github",
        "token": "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",
        "leadTime": [{
          "orgId": "aaa-11",
          "orgName": "aaa",
          "id": "firstpipeline",
          "name": "firstPipeline",
          "step": "test",
          "repository": "git@github.com:gtb-203b-xin-ye/B-basic-quiz.git"
        }]
      },
      "csvTimeStamp": 1630566152884
    };
    const response = await chai
        .request(app)
        .post("/generateReporter")
        .send(mockData);
    expect(response.status).to.equal(200);
  }).timeout(10000);
});
