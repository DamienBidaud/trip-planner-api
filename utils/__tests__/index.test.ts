import utils from "../index";

describe("utils", () => {
  it("Should match snapshot", () => {
    expect(utils).toMatchSnapshot();
  });
});
