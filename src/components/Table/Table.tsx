import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Table: React.FC = ({ children }) => {
  return (
    <Box as="table" textAlign="right">
      <tbody>{children}</tbody>
    </Box>
  );
};

export const TableRow: React.FC = ({ children }) => {
  return (
    <Box
      as="tr"
      mb="3rem"
      borderBottomColor="gunmetalIce.100"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
    >
      {children}
    </Box>
  );
};

export const TableHead: React.FC = ({ children }) => {
  return (
    <Text
      as="th"
      pt="1rem"
      pb="1rem"
      pr={["1rem", "5rem", "6rem", "10rem"]}
      textAlign="left"
    >
      {children}
    </Text>
  );
};

export const TableData: React.FC = ({ children }) => {
  return (
    <Text as="td" p="1rem 0 1rem 0" textAlign="right">
      {children}
    </Text>
  );
};
