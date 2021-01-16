import { WarningTwoIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Icon, Text } from "@chakra-ui/react";
import React from "react";

type InputAlertProps = {
  /** Alert message to display */
  message: string;
};

/**
 * Used across the application to alert users of
 * invalid input values.
 */
const InputAlert: React.FC<InputAlertProps & BoxProps> = ({
  message,
  ...rest
}) => {
  return (
    <Box d="flex" alignItems="center" {...rest}>
      <WarningTwoIcon color="red.500" focusable={false} mr="1rem" />{" "}
      <Text m="0" color="red.600">
        {message}
      </Text>
    </Box>
  );
};

export default InputAlert;
