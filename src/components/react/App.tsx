import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./Container";
import Appointment from "./appoinment/Appointment";
import Aside from "./aside/Aside";

function App() {
  const { store } = useContext(Context);
  return (
    <main>
      <div className='grid grid-cols-4 gap-5 w-4/5 mx-auto'>
        <Appointment />
        <Aside />
      </div>
    </main>
  );
}

export default observer(App);
