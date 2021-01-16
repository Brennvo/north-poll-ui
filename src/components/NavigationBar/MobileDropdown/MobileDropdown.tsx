import React, { ReactElement, useState } from "react";
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
} from "@chakra-ui/react";
import { useAuth } from "src/domain/Auth/AuthProvider/Auth";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  LightMenuIcon,
  LogoutIcon,
} from "src/config/theme/customIcons";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type MenuItemProps = {
  label: string;
  icon: React.ReactElement<any, string>;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * A styled link that should be used in a mobile
 * hamburger menu's list.
 */
const MenuItem: React.FC<MenuItemProps> = ({ label, icon, to, onClick }) => {
  return onClick === undefined ? (
    <Button
      fontSize="1.2rem"
      as={Link}
      p={0}
      bg="transparent"
      // @ts-ignore
      icon={icon}
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
      leftIcon={icon}
      // @ts-ignore
      to={to}
      letterSpacing="2px"
    >
      {label}
    </Button>
  );
};

/**
 * Renders a hamburger icon that when clicked,
 * opens a sliding drawer with menu items (links)
 * that are hidden by default in the mobile view.
 */
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
        icon={<LightMenuIcon />}
        bg="transparent"
        colorScheme="purpleIce"
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
                <MenuItem icon={<HomeIcon />} label="Home" to="/" />
              </ListItem>
              <ListItem>
                {auth?.isAuthenticated ? (
                  <MenuItem
                    label="Logout"
                    icon={<LogoutIcon />}
                    onClick={() => {
                      auth.logout();
                      setIsOpen(false);
                    }}
                  />
                ) : (
                  <MenuItem
                    label="Login"
                    icon={<ArrowForwardIcon />}
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
