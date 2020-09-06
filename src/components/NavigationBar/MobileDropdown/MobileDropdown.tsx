import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  Button,
} from "@chakra-ui/core";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import { Link } from "react-router-dom";

type MenuItemProps = {
  label: string;
  iconName: string;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const MenuItem: React.FC<MenuItemProps> = ({
  label,
  iconName,
  to,
  onClick,
}) => {
  return onClick === undefined ? (
    <Button
      fontSize="1.2rem"
      as={Link}
      p={0}
      bg="transparent"
      // @ts-ignore
      leftIcon={iconName}
      // @ts-ignore
      to={to}
      letterSpacing="2px"
    >
      {label}
    </Button>
  ) : (
    <Button
      fontSize="1.2rem"
      onClick={onClick}
      p={0}
      bg="transparent"
      // @ts-ignore
      leftIcon={iconName}
      // @ts-ignore
      to={to}
      letterSpacing="2px"
    >
      {label}
    </Button>
  );
};

const MobileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        display={{ sm: "block", md: "none" }}
        // @ts-ignore
        icon="lightMenu"
        bg="transparent"
        variantColor="purpleIce"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">The North Poll</DrawerHeader>

          <DrawerBody>
            <List>
              <ListItem m="1rem 0 1rem 0">
                <MenuItem iconName="home" label="Home" to="/" />
              </ListItem>
              <ListItem>
                {auth?.isAuthenticated ? (
                  <MenuItem
                    label="Logout"
                    iconName="logout"
                    onClick={() => {
                      auth.logout();
                      setIsOpen(false);
                    }}
                  />
                ) : (
                  <MenuItem
                    label="Login"
                    iconName="arrow-forward"
                    to="/login"
                  />
                )}
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDropdown;
