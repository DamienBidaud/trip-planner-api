import resolvers from "../";

describe("resolvers", () => {
  it("Should match snapshot", () => {
    expect(resolvers).toMatchSnapshot();
  });
});
