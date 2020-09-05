import React from "react";
import { Stack } from "@chakra-ui/core";

type CardProps = {
  bg?: string;
  w?: string;
};

const Card: React.FC<CardProps> = ({ children, bg, w }) => {
  return (
    <Stack
      bg={bg || "white"}
      width={w || "100%"}
      h="14.375rem"
      p="1rem"
      borderRadius={5}
      boxShadow="0 0 4px grey"
      m={0}
    >
      {children}
    </Stack>
  );
};

export default Card;
