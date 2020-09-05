import React from "react";
import { List, ListItem } from "@chakra-ui/core";

const FlexGrid: React.FC = ({ children }) => {
  return (
    <List
      d="flex"
      flexWrap="wrap"
      ml={["-.2rem", "-.2rem", "-1rem"]}
      mr={["-.2rem", "-.2rem", "-1rem"]}
    >
      {children}
      {React.Children.count(children) % 2 !== 0 && (
        <ListItem
          aria-hidden={true}
          flex="1 0 18.75rem"
          m={[".2rem", ".2rem", "1rem"]}
        />
      )}
    </List>
  );
};

export default FlexGrid;
