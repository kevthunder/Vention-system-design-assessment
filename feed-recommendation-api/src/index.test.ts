import { expect } from "chai";
import request from "supertest";
import app from "./app";

describe("GET /api/videos", () => {
    it("should return a list of videos", () => {
        return request(app).get("/api/videos")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an("array");
                expect(res.body[0]).to.have.property("id");
                expect(res.body[0]).to.have.property("title");
                expect(res.body[0]).to.have.property("description");
                expect(res.body[0]).to.have.property("thumbnail");
            });
    });
});
