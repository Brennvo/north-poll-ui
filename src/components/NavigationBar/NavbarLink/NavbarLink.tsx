import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/core";

type NavProps = {
  label: string;
  url?: string;
};

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
