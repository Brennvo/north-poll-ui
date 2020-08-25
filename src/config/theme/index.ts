import { theme } from "@chakra-ui/core";

import customIcons from "./customIcons";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    transparent: "transparent",
    purpleIce: "#2a3d82",
    blueIce: "#6399ee",
    gunmetalIce: "#303636",
    whiteIce: "#f1f3ff",
    cream: "#f8f8ff",
    blackIce: "#131717",
    background: "#f1f3ff",
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

export default customTheme;
