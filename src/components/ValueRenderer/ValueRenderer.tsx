import { renderPrimitive } from "../../helpers";
import { JSONValue } from "../../types";
import { KeyComponent } from "../KeyComponent/KeyComponent";
import { List } from "./ValueRenderer.styles";

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
  /**
   * When the key contains an array,
   * use the key and the index value
   * to add to the parents
   */
  const arrayParentKey = (index: number) => [...parent, `${keyName}[${index}]`];

  if (Array.isArray(value))
    return (
      <List>
        {value.map((item, index) =>
          typeof value === "object" ? (
            <KeyComponent
              key={index}
              parent={arrayParentKey(index)}
              value={item}
            />
          ) : (
            <ValueRenderer
              key={index}
              parent={[]}
              keyName={keyName}
              value={item}
            />
          )
        )}
      </List>
    );

  if (typeof value === "object")
    return (
      <List>
        {Object.entries(value).map(([key, value]) => (
          <KeyComponent
            key={key}
            parent={parent}
            propertyKey={key}
            value={value}
          />
        ))}
      </List>
    );

  return <span>{renderPrimitive(value)},</span>;
};
