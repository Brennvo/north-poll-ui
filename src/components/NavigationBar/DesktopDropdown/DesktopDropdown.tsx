import React from "react";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import {
  Menu,
  Stack,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import NavbarLink from "../NavbarLink/NavbarLink";

const DesktopDropdown = () => {
  const auth = useAuth();

  return auth?.isAuthenticated ? (
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
  ) : (
    <NavbarLink label="Login" url="/login" />
  );
};

export default DesktopDropdown;
