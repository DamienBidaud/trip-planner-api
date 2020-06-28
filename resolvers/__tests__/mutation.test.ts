import mutation from "../mutation";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createAuthorMock = jest.fn();
prisma.author.create = createAuthorMock;
const context = {
  prisma,
};

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("A_TOKEN"),
}));

describe("resolvers", () => {
  describe("mutation", () => {
    describe("signup", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });

      it("Should return an author", async () => {
        createAuthorMock.mockResolvedValue({
          username: "user",
          id: 1,
          email: "test@test.com",
        });
        const response = await mutation.signup(
          null,
          { email: "test@test.com", username: "user", password: "Test@123" },
          context
        );
        expect(response).toEqual({
          token: "A_TOKEN",
          author: { email: "test@test.com", username: "user", id: 1 },
        });
      });
    });
  });
});
