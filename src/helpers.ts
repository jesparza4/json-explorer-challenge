import { Primitive } from "./types";

export const renderPrimitive = (value: Primitive) => {
  if (typeof value === "string") return `'${value}'`;

  return `${value}`;
};
