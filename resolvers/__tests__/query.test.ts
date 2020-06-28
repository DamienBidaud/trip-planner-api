import query from "../query";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const findOneTripMock = jest.fn();
const findOneAuthorMock = jest.fn();
prisma.trip.findOne = findOneTripMock;
prisma.author.findOne = findOneAuthorMock;
const context = {
  prisma,
};
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6MSwiaWF0IjoxNTkyMTM5NjE5fQ.daD8DS7BVQzeMz4tcsx1Sth4uW9V1xj0rw026hlN6Hs";

describe("resolver", () => {
  describe("query", () => {
    describe("trip", () => {
      beforeEach(() => {
        jest.resetAllMocks();
        console.error = jest.fn();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it("Should return the trip return from the bdd", async () => {
        findOneTripMock.mockResolvedValue({ id: "111111" });
        const response = await query.trip(null, { tripId: "111111" }, context);
        expect(response).toEqual({ id: "111111" });
      });

      it("Should log the error if something unexpecteed happen", async () => {
        findOneTripMock.mockRejectedValue("an error");
        const response = await query.trip(null, { tripId: "111111" }, context);
        expect(console.error).toHaveBeenCalledWith("an error");
      });
    });

    describe("author", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
        console.error = jest.fn();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
      it("should return the author from the bdd", async () => {
        findOneAuthorMock.mockResolvedValue({
          username: "user",
          id: 1,
          email: "test@test.com",
        });
        const response = await query.author(null, { token: TOKEN }, context);
        expect(response).toEqual({
          username: "user",
          id: 1,
          email: "test@test.com",
        });
      });

      it("Should log an error if the token is not valid", async () => {
        const response = await query.author(null, { token: "abs" }, context);
        expect(console.error).toHaveBeenCalled();
        expect(response).toBeNull();
      });
    });

    describe("activity", () => {})
  });
});
