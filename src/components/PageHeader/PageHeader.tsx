import React from "react";
import { Heading, Button, Box } from "@chakra-ui/core";

type PageHeaderProps = {
  title: string;
  hasAction: boolean;
  actionText?: string;
  actionClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

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
          variantColor="purpleIce"
          variant="solid"
          color="white"
          rightIcon="small-add"
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
