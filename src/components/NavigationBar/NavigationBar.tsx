import React from "react";
import { List, ListItem, Box, Icon } from "@chakra-ui/react";
import LayoutWrapper from "../LayoutWrapper";
import MobileDropdown from "./MobileDropdown";
import DesktopDropdown from "./DesktopDropdown";
import NavbarLink from "./NavbarLink/NavbarLink";
import { PolarBearIcon } from "src/config/theme/customIcons";

/**
 * Used at the top of the application to provide users with
 * a responsive navigation bar for traversing the application's
 * features. When condensed to a small viewport, a hamburger
 * menu with a drawer will appear instead of the regular links.
 */
const NavigationBar = () => {
  return (
    <Box as="nav" bg="purpleIce.500" fontFamily="Lato" pt={1} pb={1}>
      <LayoutWrapper>
        <List
          p={0}
          mt={0}
          mb={0}
          d="flex"
          h="3.2em"
          alignItems="center"
          justifyContent="space-between"
        >
          <ListItem
            display={{ xs: "none", sm: "none", md: "block" }}
            textAlign="left"
            flexBasis="33%"
          >
            <NavbarLink label="Home" url="/" />
          </ListItem>

          <ListItem
            role="presentation"
            flexBasis={{ md: "33%" }}
            textAlign="center"
          >
            <PolarBearIcon />
            {/* <Icon name="polarBear" size="35px" /> */}
          </ListItem>

          {/* Desktop dropdown */}
          <ListItem
            flexBasis="33%"
            display={{ xs: "none", sm: "none", md: "block" }}
            textAlign="right"
          >
            <DesktopDropdown />
          </ListItem>

          {/* Mobile dropdown */}
          <ListItem display={{ xs: "block", sm: "block", md: "none" }}>
            <MobileDropdown />
          </ListItem>
        </List>
      </LayoutWrapper>
    </Box>
  );
};

export default NavigationBar;
