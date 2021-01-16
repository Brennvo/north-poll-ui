import React from "react";
import { Heading, Button, Box } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

type PageHeaderProps = {
  title: string;
  hasAction: boolean;
  actionText?: string;
  actionClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Used across the application's various pages to render the
 * top level heading element
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  hasAction,
  actionText,
  actionClick,
}) => {
  return (
    <Box
      d="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      alignItems="center"
      mb={[4, 10, 16]}
    >
      <Heading>{title}</Heading>
      {hasAction && (
        <Button
          onClick={actionClick}
          colorScheme="purpleIce"
          variant="solid"
          color="white"
          rightIcon={<SmallAddIcon />}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
