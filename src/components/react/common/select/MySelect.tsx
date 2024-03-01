import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import type { Item } from "../../../../types/index";

interface IMySelect {
  placeholder: string;
  items: Item[];
  isFirstItemIsDefault: boolean;
  clickHandler(item: Item): void;
}

interface IMySelectItem {
  state: Item | null;
  item: Item;
  clickHandler(item: Item): void;
}

function MySelectItem({ state, item, clickHandler }: IMySelectItem) {
  return (
    <li
      className={`select-list__item cursor-pointer rounded px-3 py-2 ${
        state && state.id === item.id && "bg-blue-200"
      }`}
      onClick={() => {
        clickHandler(item);
      }}
    >
      <div className={`${item.avatar && "flex gap-x-4"}`}>
        {item.avatar && <img src={item.avatar.slug} alt={item.avatar.slug} />}
        <p>{item.title}</p>
      </div>
    </li>
  );
}

function MySelect({
  placeholder,
  items,
  clickHandler,
  isFirstItemIsDefault,
}: IMySelect) {
  const myRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<Item | null>(null);
  const [listIsOpen, setListIsOpen] = React.useState<boolean>(false);
  const [listHeight, setListHeight] = React.useState<number | null>(null);

  const setListVisibility = () => {
    setListIsOpen((actual) => !actual);
  };
  const itemClickHandler = (item: Item) => {
    setState(item);
    clickHandler(item);
    setListVisibility();
  };
  const handleMouseLeave = (event) => {
    const rect = myRef.current.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const isMouseOutsideTop = mouseY < rect.top;
    const isMouseOutsideLeft = mouseX < rect.left;
    const isMouseOutsideRight = mouseX > rect.right;

    if (isMouseOutsideTop) {
      setListIsOpen(false);
    } else if (isMouseOutsideLeft) {
      setListIsOpen(false);
    } else if (isMouseOutsideRight) {
      setListIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isFirstItemIsDefault) {
      setState(items[0]);
    }
  }, []);

  React.useEffect(() => {
    if (myRef.current) {
      const height = myRef.current.getBoundingClientRect().height;
      setListHeight(height);
    }
  }, [listIsOpen]);
  return (
    <div className='relative w-full my-5'>
      <div
        className={`relative flex justify-items-stretch cursor-pointer  px-3 py-2 rounded-md border  hover:border-blue-500 ${
          listIsOpen ? " border-blue-500" : "border border-gray-500"
        }`}
        onClick={setListVisibility}
        onMouseLeave={handleMouseLeave}
        ref={myRef}
      >
        <span
          className={`grow ${
            (state || isFirstItemIsDefault) &&
            "absolute top-[-1em] left-4 px-5 bg-white text-[0.8em] "
          }`}
        >
          {placeholder}
        </span>
        <div className={`grow`}>{state && <div>{state.title}</div>}</div>
        <svg
          className={`justify-self-end h-6 w-6 transition-transform ${
            listIsOpen && "rotate-180"
          }`}
          focusable='false'
          aria-hidden='true'
          viewBox='0 0 24 24'
          data-testid='ArrowDropDownIcon'
        >
          <path d='M7 10l5 5 5-5z'></path>
        </svg>
      </div>
      {listIsOpen && (
        <div
          className={`absolute z-10 mt-1 ${
            listHeight ? `top-[${listHeight}px]` : "top-0"
          } w-full border bg-white shadow-2xl px-3 py-2 rounded-md`}
          onMouseLeave={setListVisibility}
        >
          <ul className='select-list flex flex-col gap-y-1'>
            {items.map((item) => (
              <MySelectItem
                key={item.id}
                state={state}
                item={item}
                clickHandler={itemClickHandler}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default observer(MySelect);
