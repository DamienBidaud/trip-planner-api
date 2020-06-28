import { getTrip } from "../trip";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const findOneTripMock = jest.fn();
prisma.trip.findOne = findOneTripMock;
const context = {
  prisma,
};

describe("utils", () => {
  describe("trip", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return an activity from the database", async () => {
      findOneTripMock.mockResolvedValue({ id: 1, title: "a trip" });
      const response = await getTrip(1, context);
      expect(response).toEqual({ id: 1, title: "a trip" });
    });
  });
});
