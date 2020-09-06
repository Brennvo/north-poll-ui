import React from "react";

type LayoutProps = {
  children: React.ReactElement<any>;
};

/**
 * @description This component is a zero-noise wrapper for child components looking to
 * have layout container styling inside of their components. It does not render JSX, but
 * rather, clones the children with the global container styles.
 */
const LayoutWrapper: React.FC<LayoutProps> = ({ children }) => {
  return React.cloneElement(React.Children.only(children), {
    maxWidth: "6xl",
    pl: [1, 4, 12],
    pr: [1, 4, 12],
    ml: "auto",
    mr: "auto",
  });
};

export default LayoutWrapper;
