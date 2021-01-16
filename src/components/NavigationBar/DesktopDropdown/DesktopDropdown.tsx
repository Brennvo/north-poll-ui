import React from "react";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import {
  Menu,
  Stack,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import NavbarLink from "../NavbarLink/NavbarLink";

/**
 * When the user is logged in, a drowndown will render.
 * When they are logged out, a simple link is rendered
 * to navigate them to login.
 */
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
