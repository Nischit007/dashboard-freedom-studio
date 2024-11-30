import React, { useState } from 'react';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-evenly items-center h-16 py-2 border-b max-w-xl">
        <div className="text-lg font-semibold">{format(currentMonth, dateFormat)}</div>
        <div>
          <button onClick={prevMonth} className="px-4 py-2 mx-2 bg-[#9A1D20] text-white rounded">Previous</button>
          <button onClick={nextMonth} className="px-4 py-2 ml-12 bg-[#9A1D20] text-white rounded">Next</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE"; // Abbreviated day names
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center flex-1" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="flex justify-between py-2 border-b">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        days.push(
          <div
            className={`p-4 flex-1 text-center ${!isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, new Date())
                  ? "bg-[#9A1D20] text-white rounded-full"
                  : ""
              }`}
            key={day}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex justify-between" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-4 max-w-full mx-auto h-full">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-full max-h-full">
        {renderHeader()}
        {renderDays()}
        <div className="overflow-y-auto max-h-[calc(100vh-18rem)]">{renderCells()}</div>
      </div>
    </div>
  );
};

export default Calendar;
