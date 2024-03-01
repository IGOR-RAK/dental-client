import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import type { Item } from "../../../../types/index";

interface IMyInput {
  placeholder: string;
  changeHandler(value: string): void;
  checker(value: string): boolean;
}

function MyInput({ placeholder, checker }: IMyInput) {
  const [value, setValue] = React.useState("");
  const [isStart, setIsStart] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isMouse, setIsMouse] = React.useState(false);

  const errorHandler = () => {
    const checkError = checker(value);
    console.log(checkError);
    setIsError(checkError);
  };

  return (
    <div>
      <div
        className={`relative cursor-pointer  px-3 py-2 rounded-md border   ${
          isMouse && !(value.length === 0)
            ? `border-blue-500`
            : `${isError ? `border-red-500` : `border-gray-500`} `
        }
        }`}
        onClick={() => {
          setIsFocus(true);
          setIsMouse(true);
          if (!isStart) {
            setIsStart(true);
          }
        }}
        onMouseLeave={() => {
          if (value.length === 0 && isStart) {
            setIsFocus(false);
            errorHandler();
          }
          setIsMouse(false);
        }}
      >
        <span
          className={`${
            isMouse && !(value.length === 0)
              ? "text-blue-500"
              : `${isError ? `text-red-500` : `text-gray-500`}`
          } ${
            isFocus && "absolute top-[-1em] left-4 px-5 bg-white text-[0.8em]"
          } `}
        >
          {placeholder}
        </span>
        {isFocus && (
          <input
            className={`w-full outline-none border-none`}
            autoFocus={isFocus ? true : false}
            value={value}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setIsError(true);
              } else {
                setIsError(false);
              }
              setValue(e.target.value);
            }}
          />
        )}
      </div>
      <div></div>
    </div>
  );
}

export default observer(MyInput);
