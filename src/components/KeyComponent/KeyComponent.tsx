import { ValueRenderer } from "../ValueRenderer";
import { ObjectKey, PairContainer, PropertyKey } from "./KeyComponent.styles";
import { JSONValue } from "../../types";

export interface KeyComponentProps {
  propertyKey?: string;
  value: JSONValue;
  parent: Array<string>;
}

export const KeyComponent = ({
  propertyKey,
  value,
  parent,
}: KeyComponentProps) => {
  const valueRendered = (
    <ValueRenderer parent={parent} keyName={propertyKey ?? ""} value={value} />
  );

  if (Array.isArray(value))
    return (
      <>
        <ObjectKey>{propertyKey}: [</ObjectKey>
        {valueRendered}
        ],
      </>
    );

  if (typeof value === "object")
    return (
      <>
        <ObjectKey>
          {propertyKey && `${propertyKey}:`} {" {"}
        </ObjectKey>
        {valueRendered}
        {"}"},
      </>
    );

  return (
    <PairContainer>
      {propertyKey && <PropertyKey>{propertyKey}</PropertyKey>}
      {valueRendered}
    </PairContainer>
  );
};
