import { renderPrimitive } from "./helpers";

describe("renderPrimitive", () => {
  it("renders a string", () => {
    expect(renderPrimitive("foo")).toBe("'foo'");
  });

  it("renders a boolean", () => {
    expect(renderPrimitive(false)).toBe("false");
  });

  it("renders a number", () => {
    expect(renderPrimitive(1)).toBe("1");
  });
});
