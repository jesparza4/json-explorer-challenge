import { render, screen, waitFor, within } from "@testing-library/react";
import { JsonExplorer, JsonExplorerProps } from "./JsonExplorer";
import userEvent from "@testing-library/user-event";

const renderComponent = (props: Partial<JsonExplorerProps> = {}) => {
  render(<JsonExplorer json={{ hasError: true }} rootName="res" {...props} />);
};

const withinKeyInput = () => within(screen.getByTestId("key-input"));

describe("JsonExplorer", () => {
  it("changes key input on key select", async () => {
    renderComponent();

    await waitFor(async () => {
      await userEvent.click(screen.getByText("hasError"));
    });

    await waitFor(() => {
      screen.getByDisplayValue("res.hasError");
      expect(withinKeyInput().getByText("true")).toBeInTheDocument();
    });
  });

  it("displays the value for key path", async () => {
    renderComponent({ json: { prop: "iban" } });

    await waitFor(async () => {
      await userEvent.type(screen.getByPlaceholderText("Property"), "res.prop");
    });

    await waitFor(() => {
      expect(withinKeyInput().getByText("'iban'")).toBeInTheDocument();
    });
  });

  it("displays undefined if the path does not exist", async () => {
    renderComponent({ json: { prop: "iban" } });

    await waitFor(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("Property"),
        "res.props"
      );
    });

    await waitFor(() => {
      expect(withinKeyInput().getByText("undefined")).toBeInTheDocument();
    });
  });
});
