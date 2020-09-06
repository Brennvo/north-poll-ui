import React from "react";
import { ListItem } from "@chakra-ui/core";

const FlexGridItem: React.FC = ({ children }) => {
  return (
    <ListItem flex="1 0 18.75rem" m={[".2rem", ".2rem", "1rem"]}>
      {children}
    </ListItem>
  );
};

export default FlexGridItem;
