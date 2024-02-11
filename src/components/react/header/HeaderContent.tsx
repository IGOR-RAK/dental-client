import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function HeaderContent() {
  const { store } = useContext(Context);
  return <div>{store.title}</div>;
}

export default observer(HeaderContent);