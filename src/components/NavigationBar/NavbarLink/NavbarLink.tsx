import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

type NavProps = {
  label: string;
  url?: string;
};

/**
 * Wrapper component for styling a navigation link
 */
const NavbarLink: React.FC<NavProps> = ({ label, url = "" }) => {
  return (
    <Link to={url}>
      <Text color="white" as="a" fontFamily="Lato">
        {label}
      </Text>
    </Link>
  );
};

export default NavbarLink;
