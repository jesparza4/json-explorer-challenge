import { KeyComponent } from "../KeyComponent";
import { ExplorerProvider } from "../../ExplorerContext";
import {
  FormSection,
  Label,
  InputField,
  LabelCaption,
  Explorer,
} from "./JsonExplorer.styles";
import { useJsonExplorer } from "./JsonExplorer.viewModel";
import { JSONValue } from "../../types";
import { renderPrimitive } from "../../helpers";

export interface JsonExplorerProps {
  json: JSONValue;
  rootName: string;
}

export const JsonExplorer = ({ json, rootName }: JsonExplorerProps) => {
  const {
    addKeyValue,
    handleKeyInputChange,
    keyInputValue,
    selectedValueForKey,
    setSelectedKeyValue,
  } = useJsonExplorer();

  return (
    <>
      <FormSection data-testid="key-input">
        <Label>Property</Label>
        <InputField
          value={keyInputValue}
          onChange={handleKeyInputChange}
          placeholder="Property"
        />
        <LabelCaption>{renderPrimitive(selectedValueForKey)}</LabelCaption>
      </FormSection>
      <ExplorerProvider
        value={{ onSelectKey: setSelectedKeyValue, addKeyValue }}
      >
        <Explorer>
          <KeyComponent value={json} parent={[rootName]} />
        </Explorer>
      </ExplorerProvider>
    </>
  );
};
