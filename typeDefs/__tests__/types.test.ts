import types from "../types";

describe("typeDefs", () => {
  describe("types", () => {
    it("Should match snapshot", () => {
      expect(types).toMatchSnapshot();
    });
  });
});
