import React, { createContext } from "react";
import Store from "./store/store";
import App from "./App";

interface State {
  store: Store;
}
export const store = new Store();

export const Context = createContext<State>({
  store,
});

export default function Container() {
  return (
    <Context.Provider
      value={{
        store,
      }}
    >
      <App />
    </Context.Provider>
  );
}