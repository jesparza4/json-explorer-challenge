import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Primitive } from "../../types";

const keyDictionary = new Map();

export const useJsonExplorer = () => {
  /**
   * The selected key via mouse click on the
   * JSON viewer
   */
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  /**
   * The input holding the selected key
   * or the manuel entry.
   */
  const [keyInputValue, setKeyInputValue] = useState<string>("");

  /**
   * Retrieve the value from the values dictionary
   * based *only* on the given input.
   */
  const selectedValueForKey = useMemo(
    () => keyDictionary.get(keyInputValue),
    [keyInputValue]
  );

  const handleKeyInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyInputValue(e.currentTarget.value);

  /**
   * Add a key - value (primitive) pair
   * to the values dictionary
   * @param key
   * @param value
   */
  const addKeyValue = (key: string, value: Primitive) => {
    keyDictionary.set(key, value);
  };

  /**
   * When a key is selected, update the value
   * inside the key input
   */
  useEffect(() => {
    setKeyInputValue(selectedKey ?? "");
  }, [selectedKey]);

  return {
    selectedValueForKey,
    addKeyValue,
    handleKeyInputChange,
    keyInputValue,
    setSelectedKeyValue: setSelectedKey,
  };
};
