import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function Appoinment() {
  const { store } = useContext(Context);
  return <aside className="col-span-1">Asside</aside>;
}

export default observer(Appoinment);
