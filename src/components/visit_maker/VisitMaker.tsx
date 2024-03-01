import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

interface IVisitMaker {
  start: number;
  finish: number;
  hiden_time_start: number;
  hiden_time_end: number;
}

interface Visit {}

interface Minute {
  number: number;
  isFree: boolean;
  isOpenTime: boolean;
  isHiden: boolean;
  hour: number | null;
  isReserved: Visit | null;
}

function createMinutesArray(
  totalMinutes: number,
  start: number,
  finish: number,
  hiden_time_start: number,
  hiden_time_end: number
): Minute[] {
  const minutesArray: Minute[] = [];

  const setIsOpen = (i: number) => {
    if (i > start - 1 && i < finish + 1) {
      return true;
    } else {
      return false;
    }
  };

  const setIsHide = (i: number) => {
    if (i > hiden_time_start && i < hiden_time_end) {
      return true;
    } else {
      return false;
    }
  };

  const setHour = (i: number) => {
    const time = i / 60;
    if (Number.isInteger(time) && i % 60 === 0 && time !== 0) {
      return time;
    } else {
      return null;
    }
  };

  for (let i = 0; i < totalMinutes; i++) {
    minutesArray.push({
      number: i,
      isFree: true,
      isOpenTime: setIsOpen(i),
      isHiden: setIsHide(i),
      hour: setHour(i),
    });
  }

  return minutesArray;
}

function VisitMaker({
  start,
  finish,
  hiden_time_start,
  hiden_time_end,
}: IVisitMaker) {
  const [day, setDay] = React.useState([] as Minute[]);
  React.useEffect(() => {
    const totalMinutes = 1440; // Total minutes in a day
    const minutesOfDay: Minute[] = createMinutesArray(
      totalMinutes,
      start,
      finish,
      hiden_time_start,
      hiden_time_end
    );
    setDay(minutesOfDay);
  }, []);
  return (
    <div className='my-8'>
      <div className='flex'>
        <div className='flex flex-col w-10'>
          {day &&
            day.map(
              (minute) =>
                !minute.isHiden && (
                  <div
                    className={`relative h-[1px] w-ful ${
                      minute.hour && "bg-gray-500"
                    }`}
                  >
                    {minute.hour && (
                      <div className='absolute w-full left-0 bottom-0'>
                        {minute.hour}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
        <div className='flex flex-col w-20 border'>
          {day &&
            day.map(
              (minute) =>
                !minute.isHiden && (
                  <div
                    className={`h-[1px] w-ful cursor-pointer ${
                      minute.isOpenTime
                        ? `hover:bg-green-500 ${
                            minute.number % 60 === 0
                              ? `bg-black`
                              : `${
                                  (minute.number % 60) % 15 === 0
                                    ? `bg-red-500/50`
                                    : `bg-blue-500/50`
                                }`
                          }`
                        : `bg-grey-500`
                    }`}
                  ></div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default observer(VisitMaker);
