import React, { useState, useEffect } from "react";
import { getMonth, getDaysInMonth, getDay, getYear } from 'date-fns';
import { FormControl, Text, Flex } from "@chakra-ui/core";
import SingleSelect from "../SingleSelect";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// interface Date {
//   day: string;
//   month: string;
//   year: string;
// }

type GroupInputProps = {
  initialDay: number | null;
  initialMonth: number | null;
  initialYear: number | null;
  onDateSelection: (date: Date) => void;
  yearsFromNow?: number;
};

const DateInputs: React.FC<GroupInputProps> = ({
  initialDay,
  initialMonth,
  initialYear,
  onDateSelection,
  yearsFromNow,
}) => {
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [year, setYear] = useState(initialYear);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('the month is: ', e.target.value);
    setMonth(parseInt(e.target.value));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  useEffect(() => {
    if (month !== null && day !== null && year !== null) {
      onDateSelection(new Date(year, month, day));
    }
  }, [month, day, year]);

  return (
    <>
      <FormControl as="fieldset" d="flex">
        <legend>
          <Text>Date:</Text>
        </legend>
        <Flex>
          <SingleSelect
            value={month}
            mr=".5rem"
            id="month"
            onChange={handleMonthChange}
            aria-label="month"
            d="inline-block"
            placeholder="Month"
          >
            {months.map((month, i) => (
              <option value={i} key={month}>
                {month}
              </option>
            ))}
          </SingleSelect>


          {month && year ? (
            <SingleSelect
              value={day}
              mr=".5rem"
              id="day"
              placeholder="Day"
              onChange={handleDayChange}
              aria-label="day"
            >
              {[...Array(getDaysInMonth(new Date(year, month)))].map(
                (_, monthNum) => (
                  <option value={monthNum} key={monthNum}>
                    {monthNum + 1}
                  </option>
                )
              )}
            </SingleSelect>
          ) : (
            <SingleSelect value={null} placeholder="Day" disabled />
          )}

          {month && year ? (
            <SingleSelect
              value={year}
              id="year"
              placeholder="Year"
              onChange={handleYearChange}
              aria-label="year"
            >
              {yearsFromNow
                ? [...Array(yearsFromNow)].map((_, index) => (
                    <option value={getYear(new Date()) + index} key={index}>
                      {getYear(new Date()) + index}
                    </option>
                  ))
                : [...Array(100)].map((_, index) => (
                    <option value={getYear(new Date()) - index} key={index}>
                      {getYear(new Date()) - index}
                    </option>
                  ))}
            </SingleSelect>

          ) : (
              <SingleSelect value={null} placeholder="Year" disabled />
          )}

        </Flex>
      </FormControl>
    </>
  );
};

export default DateInputs;
