import { createContext, useContext } from "react";
import { Primitive } from "./types";

interface ExplorerContextProps {
  onSelectKey: (key: string) => void;
  addKeyValue: (key: string, value: Primitive) => void;
}

export const ExplorerContext = createContext<ExplorerContextProps>({
  onSelectKey: (_) => {
    throw new Error("Function not implemented.");
  },
  addKeyValue: function (key: string, value: Primitive): void {
    throw new Error("Function not implemented.");
  },
});

export const useExplorer = () => useContext(ExplorerContext);

export const ExplorerProvider = ExplorerContext.Provider;
