export type Primitive = string | number | boolean;

export type JSONValue =
  | Primitive
  | { [x: string]: JSONValue }
  | Array<JSONValue>;
