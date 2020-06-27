import query from "../query";

describe("typeDefs", () => {
  describe("query", () => {
    it("Should match snapshot", () => {
      expect(query).toMatchSnapshot();
    });
  });
});
