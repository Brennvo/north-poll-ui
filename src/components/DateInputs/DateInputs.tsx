import React, { useState, useEffect } from "react";
import moment from "moment";
import { Select, FormControl, Text, FormLabel, Flex } from "@chakra-ui/core";

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

interface Date {
  day: string;
  month: string;
  year: string;
}

type GroupInputProps = {
  onDateSelection: (date: Date) => void;
  yearsFromNow?: number;
};

const DateInputs: React.FC<GroupInputProps> = ({
  onDateSelection,
  yearsFromNow,
}) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    if (month !== "" && day !== "" && year !== "") {
      onDateSelection({
        day,
        month,
        year,
      });
    }
  }, [month, day, year]);

  return (
    <>
      <FormControl as="fieldset" d="flex">
        <legend>
          <Text>Date:</Text>
        </legend>
        <Flex>
          <Select
            value={month}
            mr=".5rem"
            id="month"
            placeholder="Month"
            onChange={handleMonthChange}
            aria-label="month"
            d="inline-block"
          >
            {months.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </Select>

          <Select
            value={day}
            mr=".5rem"
            id="day"
            placeholder="Day"
            onChange={handleDayChange}
            aria-label="day"
          >
            {[...Array(moment(month || "January", "MMMM").daysInMonth())].map(
              (_, monthNum) => (
                <option value={monthNum + 1} key={monthNum}>
                  {monthNum + 1}
                </option>
              )
            )}
          </Select>

          <Select
            value={year}
            id="year"
            placeholder="Year"
            onChange={handleYearChange}
            aria-label="year"
          >
            {yearsFromNow
              ? [...Array(yearsFromNow)].map((_, index) => (
                  <option value={moment().year() + index} key={index}>
                    {moment().year() + index}
                  </option>
                ))
              : [...Array(100)].map((_, index) => (
                  <option value={moment().year() - index} key={index}>
                    {moment().year() - index}
                  </option>
                ))}
          </Select>
        </Flex>
      </FormControl>
    </>
  );
};

export default DateInputs;
