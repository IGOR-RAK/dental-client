import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";
import Calendar from "./Calendar";
import Form from "./Form";
import Code from "./Code";
import Finish from "./Finish";

function Appoinment() {
  const { store } = useContext(Context); 
  return (
    <section className="col-span-3">
      {store.screen === 1 && <Calendar/>}
      {store.screen === 2 && <Form/>}
      {store.screen === 3 && <Code/>}
      {store.screen === 4 && <Finish/>}
    </section>
  );
}

export default observer(Appoinment);
