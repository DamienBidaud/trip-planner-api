import { getActivity } from "../activity";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const findOneActivitypMock = jest.fn();
prisma.activity.findOne = findOneActivitypMock;
const context = {
  prisma,
};

describe("utils", () => {
  describe("activity", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return an activity from the database", async () => {
      findOneActivitypMock.mockResolvedValue({ id: 1, title: "an activity" });
      const response = await getActivity(1, context);
      expect(response).toEqual({ id: 1, title: "an activity" });
    });
  });
});
