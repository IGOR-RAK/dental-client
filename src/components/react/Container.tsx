import React, { createContext } from "react";
import Store from "./store/store";
import {store} from "./store/context"
import App from "./App";

interface State {
  store: Store;
}


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