import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function Finish() {
  const { store } = useContext(Context);
  return <div>Form</div>;
}

export default observer(Finish);