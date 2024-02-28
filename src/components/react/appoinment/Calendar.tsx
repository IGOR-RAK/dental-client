import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../Container";
import MySelect from "../common/select/MySelect";
import type { Item } from "../../../types/index";

const items: Item[] = [
  { id: 1, title: "Reason 1", avatar: null },
  { id: 2, title: "Reason 2", avatar: null },
  { id: 3, title: "Reason 3", avatar: null },
  { id: 4, title: "Reason 4", avatar: null },
  { id: 5, title: "Reason 5", avatar: null },
  { id: 6, title: "Reason 6", avatar: null },
];

const sex: Item[] = [
  { id: 1, title: "Male", avatar: null },
  { id: 2, title: "Female", avatar: null },
  { id: 3, title: "Neither", avatar: null },
];

function Calendar() {
  const { store } = useContext(Context);
  const selectHandler = (item: Item) => {
    console.log(item);
  };
  return (
    <div>
      <h2>Calendar</h2>
      <MySelect
        placeholder='Select a reason'
        items={items}
        isFirstItemIsDefault={true}
        clickHandler={selectHandler}
      />
      <MySelect
        placeholder='Sex*'
        items={sex}
        isFirstItemIsDefault={false}
        clickHandler={selectHandler}
      />
    </div>
  );
}

export default observer(Calendar);
