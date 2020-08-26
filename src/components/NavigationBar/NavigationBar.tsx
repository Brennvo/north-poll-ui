import React from "react";
import {
  List,
  ListItem,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Icon,
} from "@chakra-ui/core";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import LayoutWrapper from "../LayoutWrapper";
import { Link } from "react-router-dom";

type NavProps = {
  label: string;
  url?: string;
};

const NavBarItem: React.FC<NavProps> = ({ label, url = "" }) => {
  return (
    <ListItem>
      <Link to={url}>
        <Text color="white" as="a" fontFamily="Lato">
          {label}
        </Text>
      </Link>
    </ListItem>
  );
};

const LoggedInDropdown = () => {
  const auth = useAuth();
  return (
    <Menu>
      <MenuButton color="white">{auth?.user?.username}</MenuButton>
      <MenuList>
        <MenuItem onClick={() => auth?.logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const NavigationBar = () => {
  const auth = useAuth();

  return (
    <Box as="nav" bg="purpleIce" fontFamily="Lato" pt={1} pb={1}>
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
          <NavBarItem label="Home" />
          <Icon name="polarBear" size="35px" />
          {auth?.isAuthenticated ? (
            <LoggedInDropdown />
          ) : (
            <NavBarItem label="Login" url="/login" />
          )}
        </List>
      </LayoutWrapper>
    </Box>
  );
};

export default NavigationBar;
