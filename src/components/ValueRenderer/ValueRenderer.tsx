import { renderPrimitive } from "../../helpers";
import { JSONValue } from "../../types";

export interface ValueRendererProps {
  value: JSONValue;
  keyName: string;
  parent: Array<string>;
}

export const ValueRenderer = ({
  keyName,
  value,
  parent,
}: ValueRendererProps) => {
  if (Array.isArray(value)) return <></>;

  if (typeof value === "object") return <></>;

  return <span>{renderPrimitive(value)},</span>;
};
