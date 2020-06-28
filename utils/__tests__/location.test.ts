import { findLocation, addLocation } from "../location";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const findManyLocationMock = jest.fn();
const creatLocationMock = jest.fn();
prisma.location.findMany = findManyLocationMock;
prisma.location.create = creatLocationMock;
const context = {
  prisma,
};

describe("utils", () => {
  describe("trip", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    describe("findLocation", () => {
      it("Should return an activity from the database", async () => {
        findManyLocationMock.mockResolvedValue([{ id: 1, country: "a pay" }]);
        const response = await findLocation(context, {
          country: "France",
          city: "Paris",
        });
        expect(response).toEqual([{ id: 1, country: "a pay" }]);
      });
    });

    describe("addLocation", () => {
      it("Should add a location and return the value", async () => {
        creatLocationMock.mockResolvedValue({ id: 1, country: "a country" });
        const response = await addLocation(context, {
          id: 1,
          country: "France",
          city: "Paris",
          type: "UNIQUE",
          longitude: null,
          latitude: null,
          googleUrl: null,
          activityId: null,
        });
        expect(response).toEqual({ id: 1, country: "a country" });
      });
    });
  });
});
