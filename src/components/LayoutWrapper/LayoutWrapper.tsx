import React from "react";

type LayoutProps = {
  /** Chakra UI component */
  children: React.ReactElement<any>;
};

/**
 * Used across the application when content needs to be wrapped
 * by the application's global margin body styling specifications.
 * It does require the children to be a Chakra UI component that accepts
 * BoxProps
 * @see BoxProps
 */
const LayoutWrapper: React.FC<LayoutProps> = ({ children }) => {
  /**
   * We clone the children and add Chakra UI props to prevent
   * adding additional <div> elements to the DOM
   */
  return React.cloneElement(React.Children.only(children), {
    maxWidth: "6xl",
    pl: [1, 4, 12],
    pr: [1, 4, 12],
    ml: "auto",
    mr: "auto",
  });
};

export default LayoutWrapper;
