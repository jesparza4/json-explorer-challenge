import { render, screen } from "@testing-library/react";
import { KeyComponent, KeyComponentProps } from "./KeyComponent";

const renderComponent = (props: Partial<KeyComponentProps> = {}) => {
  render(<KeyComponent value={{ foo: "bar" }} parent={[]} {...props} />);
};

describe("KeyComponent", () => {
  it("renders a key pair", () => {
    renderComponent({ value: { key: "value" } });

    expect(screen.getByText("{")).toBeInTheDocument();
    expect(screen.getByText("key")).toBeInTheDocument();
    expect(screen.getByText("'value',")).toBeInTheDocument();
    expect(screen.getByText("},")).toBeInTheDocument();
  });

  it("renders an array", () => {
    renderComponent({ value: { numbers: [1, 2, 3] } });

    expect(screen.getByText("numbers: [")).toBeInTheDocument();
    expect(screen.getByText("],")).toBeInTheDocument();
  });

  it("renders an object", () => {
    renderComponent({ value: { fields: { prop: "iban" } } });

    expect(screen.getByText("{")).toBeInTheDocument();
    expect(screen.getByText("fields: {")).toBeInTheDocument();
    expect(screen.getByText("prop")).toBeInTheDocument();
    expect(screen.getByText("'iban',")).toBeInTheDocument();
    expect(screen.queryAllByText("},").length).toBe(2);
  });

  it("renders a keyless value", () => {
    renderComponent({ value: false });

    expect(screen.getByText("false,")).toBeInTheDocument();
  });
});
