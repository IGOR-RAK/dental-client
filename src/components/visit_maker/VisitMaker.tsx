import React, { useState, useEffect } from "react";
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
  totalUnits: number,
  start: number,
  finish: number,
  hiden_time_start: number,
  hiden_time_end: number
): Minute[] {
  const minutesArray: Minute[] = [];

  const setIsOpen = (i: number) => {
    const minute = i * 5;
    return minute > start - 1 && minute < finish + 1;
  };

  const setIsHide = (i: number) => {
    const minute = i * 5;
    return minute > hiden_time_start && minute < hiden_time_end;
  };

  const setHour = (i: number) => {
    const minute = i * 5;
    const time = minute / 60;
    return Number.isInteger(time) && minute % 60 === 0 && time !== 0
      ? time
      : null;
  };

  for (let i = 0; i < totalUnits; i++) {
    minutesArray.push({
      number: i,
      isFree: true,
      isOpenTime: setIsOpen(i),
      isHiden: setIsHide(i),
      hour: setHour(i),
      isReserved: null,
    });
  }

  return minutesArray;
}

function minuteToTime(unit: number): string {
  const minutes = unit * 5;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  return `${formattedHours}.${formattedMins}`;
}

function VisitMaker({
  start,
  finish,
  hiden_time_start,
  hiden_time_end,
}: IVisitMaker) {
  const [day, setDay] = useState([] as Minute[]);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const totalUnits = 1440 / 5; // Total 5-minute units in a day
    const minutesOfDay: Minute[] = createMinutesArray(
      totalUnits,
      start,
      finish,
      hiden_time_start,
      hiden_time_end
    );
    setDay(minutesOfDay);
  }, []);

  return (
    <div className='my-8'>
      <div className='my-10'>{time}</div>
      <div className='flex'>
        <div className='flex flex-col w-10'>
          {day &&
            day.map(
              (minute) =>
                !minute.isHiden && (
                  <div
                    key={minute.number}
                    className={`relative h-[5px] w-full ${
                      minute.hour !== null && "bg-gray-500"
                    }`}
                  >
                    {minute.hour !== null && (
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
                    key={minute.number}
                    className={`h-[5px] w-full cursor-pointer ${
                      minute.isOpenTime
                        ? `${!minute.isReserved && "hover:bg-green-700"} ${
                            minute.number % 12 === 0
                              ? "bg-black"
                              : `${
                                  minute.number % 3 === 0
                                    ? "bg-gray-500/50"
                                    : "bg-blue-500/50"
                                }`
                          }`
                        : "bg-grey-500"
                    }`}
                    onMouseOver={() => {
                      const time = minuteToTime(minute.number);
                      setTime(time);
                    }}
                    onMouseLeave={() => {
                      setTime(null);
                    }}
                  ></div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default observer(VisitMaker);
