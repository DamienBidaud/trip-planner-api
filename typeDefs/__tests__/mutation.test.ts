import mutation from "../mutation";

describe("typeDefs", () => {
  describe("mutation", () => {
    it("Should match snapshot", () => {
      expect(mutation).toMatchSnapshot();
    });
  });
});
