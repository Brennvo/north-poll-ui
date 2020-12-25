import React from "react";
import { List, ListItem } from "@chakra-ui/core";

/**
 * Used across the application to render a grid layout. It
 * uses a flexbox container to implement the grid style by
 * manipulating margins and appending invisble flex-items
 * to the grid for styling purposes if necessary.
 *  
 * @example
 * Without this component, a grid would appear as follows, with
 * a plus (+) representing space taken up by each flex-item.
 
   |  ++   ++   ++   |
   |  ++   ++++++++  |

  * As we can see, the last row stretches its last child to take
  * the rest of the row's width. However, when using the FlexGrid,
  * a grid will appear as follows, with a minus (-) representing
  * an invisible flex-item.
  * 
   |  ++   ++   ++   |
   |  ++   ++   --   |
  
  * @see FlexGridItem
 */
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
