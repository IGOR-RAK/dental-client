import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";

function Calendar() {
  const { store } = useContext(Context);
  return <div>Calendar</div>;
}

export default observer(Calendar);
