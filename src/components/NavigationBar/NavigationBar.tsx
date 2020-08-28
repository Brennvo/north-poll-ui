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
  Avatar,
  Stack,
} from "@chakra-ui/core";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import LayoutWrapper from "../LayoutWrapper";
import { Link } from "react-router-dom";

type NavProps = {
  label: string;
  url?: string;
  textAlign: "left" | "right";
};

const NavBarItem: React.FC<NavProps> = ({ label, url = "", textAlign }) => {
  return (
    <ListItem flexBasis="33%" textAlign={textAlign}>
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
      <Stack isInline flexBasis="33%" justifyContent="flex-end">
        <MenuButton color="white">Hello, {auth?.user?.username}</MenuButton>
        <Avatar
          name={auth?.user?.username}
          size="sm"
          src={auth?.user?.pictureUrl}
        />
      </Stack>
      <MenuList>
        <MenuItem onClick={() => auth?.logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const NavigationBar = () => {
  const auth = useAuth();

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
          <NavBarItem label="Home" textAlign="left" />
          <Icon flexBasis="33%" name="polarBear" size="35px" />
          {auth?.isAuthenticated ? (
            <LoggedInDropdown />
          ) : (
            <NavBarItem label="Login" url="/login" textAlign="right" />
          )}
        </List>
      </LayoutWrapper>
    </Box>
  );
};

export default NavigationBar;
