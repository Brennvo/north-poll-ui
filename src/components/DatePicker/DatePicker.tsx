import React from "react";
import { Icon, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface Props {
  selectedDate: Date;
  id: string;
  onChange: (date: Date) => void;
}

const DatePicker = ({ id, selectedDate, onChange, ...props }: Props) => {
  return (
    // <InputGroup width="11rem">
    //   <InputLeftAddon
    //     children={<Icon name="calendar" color="gray.300" />}
    //     color="gunmetalIce"
    //   />
    <ReactDatePicker
      id={id}
      minDate={new Date()}
      selected={selectedDate}
      onChange={onChange}
      showPopperArrow={false}
      {...props}
    />
    // </InputGroup>
  );
};

export default DatePicker;
