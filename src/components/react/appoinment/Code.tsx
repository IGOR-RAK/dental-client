import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function Form() {
  const { store } = useContext(Context);
  return <div>Code</div>;
}

export default observer(Form);