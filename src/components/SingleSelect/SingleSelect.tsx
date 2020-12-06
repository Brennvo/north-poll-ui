import { Select } from "@chakra-ui/core";
import React from "react";

type SingleSelectProps = {
  placeholder?: string | number;
  value: string | number | null;
  [propName: string]: any;
};

/**
 * Used across the application to render an select input
 * with a placeholder option that meets accessibility
 * requirements
 */
const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  placeholder,
  children,
  ...rest
}) => {
  return (
    <Select value={value || placeholder} {...rest}>
      {placeholder && (
        <option disabled value="placeholder" {...rest}>
          {placeholder}
        </option>
      )}
      {children}
    </Select>
  );
};

export default SingleSelect;
