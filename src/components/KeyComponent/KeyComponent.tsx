import { useCallback, useEffect, useMemo } from "react";
import { ValueRenderer } from "../ValueRenderer";
import { ObjectKey, PairContainer, PropertyKey } from "./KeyComponent.styles";
import { useExplorer } from "../../ExplorerContext";
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
  const { onSelectKey, addKeyValue } = useExplorer();

  /**
   * Build the Key path string if
   * the property exist
   */
  const keyPath = useMemo(() => {
    if (!propertyKey) return;

    // if (!parent.length) return propertyKey;

    return [...parent, propertyKey].join(".");
  }, [parent, propertyKey]);

  const handleKeyClick = useCallback(() => {
    if (!keyPath) return;

    onSelectKey(keyPath);
  }, [keyPath, onSelectKey]);

  /**
   * When this Key - Value is a primitive,
   * add it to the values dictionary using
   * the context.
   */
  useEffect(() => {
    if (!keyPath) return;

    if (typeof value === "object") return;

    addKeyValue(keyPath, value);
  }, [keyPath, value, addKeyValue]);

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
      {propertyKey && (
        <PropertyKey onClick={handleKeyClick}>{propertyKey}</PropertyKey>
      )}
      {valueRendered}
    </PairContainer>
  );
};
