import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function Finish() {
  const { store } = useContext(Context);
  return <div>Finish</div>;
}

export default observer(Finish);