import { render, screen } from "@testing-library/react";
import { KeyComponent, KeyComponentProps } from "./KeyComponent";
import { ExplorerProvider } from "../../ExplorerContext";
import userEvent from "@testing-library/user-event";

const mockOnAddKeyValue = jest.fn();
const mockOnSelectKey = jest.fn();

const renderComponent = (props: Partial<KeyComponentProps> = {}) => {
  render(
    <ExplorerProvider
      value={{ addKeyValue: mockOnAddKeyValue, onSelectKey: mockOnSelectKey }}
    >
      <KeyComponent value={{ foo: "bar" }} parent={[]} {...props} />
    </ExplorerProvider>
  );
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

  it("calls function on click", () => {
    renderComponent({ value: { prop: "iban" }, parent: ["res"] });

    userEvent.click(screen.getByText("prop"));
    expect(mockOnSelectKey).toHaveBeenCalledWith("res.prop");
  });

  describe("adding a primitive value and its path to the dictionary", () => {
    it("adds primitive", () => {
      renderComponent();

      expect(mockOnAddKeyValue).toHaveBeenCalledWith("foo", "bar");
    });

    it("adds the key of an object inside an array", () => {
      renderComponent({ value: { fields: [{ prop: "iban" }] } });

      expect(mockOnAddKeyValue).toHaveBeenCalledWith("fields[0].prop", "iban");
    });

    it("adds a nested key", () => {
      renderComponent({ parent: ["res"], value: { data: false } });

      expect(mockOnAddKeyValue).toHaveBeenCalledWith("res.data", false);
    });
  });
});
