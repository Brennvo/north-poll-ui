import React from "react";
import { Stack } from "@chakra-ui/core";

type CardProps = {
  /** Background of the card */
  bg?: string;

  /** Width of the card */
  w?: string;
};

/**
 * Used across the application to render content about a
 * single subject in a predefined space.
 */
const Card: React.FC<CardProps> = ({ children, bg, w }) => {
  return (
    <Stack
      bg={bg || "white"}
      width={w || "100%"}
      h={["12rem", "12rem", "12rem", "14.375rem"]}
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
