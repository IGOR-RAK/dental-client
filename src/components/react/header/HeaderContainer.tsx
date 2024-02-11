import React, { createContext } from "react";
import Store from "../store/store";
import {store} from "../store/context"
import HeaderContent from "./HeaderContent";


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
      <HeaderContent />
    </Context.Provider>
  );
}