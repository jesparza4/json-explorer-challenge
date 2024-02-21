import { render, screen } from "@testing-library/react";
import { ValueRenderer, ValueRendererProps } from "./ValueRenderer";

const renderComponent = (props: Partial<ValueRendererProps> = {}) => {
  render(
    <ValueRenderer value={"a value"} keyName={"foo"} parent={[]} {...props} />
  );
};

describe("ValueRenderer", () => {
  it("renders a primitive", () => {
    renderComponent({ value: "a string" });
    expect(screen.getByText("'a string',")).toBeInTheDocument();
  });

  it("renders an array", () => {
    renderComponent({ value: [1, 2, 3] });

    expect(screen.getByText("1,")).toBeInTheDocument();
    expect(screen.getByText("3,")).toBeInTheDocument();
    expect(screen.getByText("3,")).toBeInTheDocument();
  });
});
