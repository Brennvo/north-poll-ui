import React from "react";
import LayoutWrapper from "../LayoutWrapper";
import { Box, Skeleton } from "@chakra-ui/react";
import Loading from "../Loading";

/**
 * Used in the application when initial data (user info, page data)
 * is being fetched asychronously. It replaces the header bar with
 * a gradient and adds a loading spinner where the main content will render.
 */
const LoadingPage: React.FC = () => {
  return (
    <>
      <Skeleton h="3.8em" startColor="#3951ac" />
      <LayoutWrapper>
        <Box mt="25vh" as="section" d="flex" justifyContent="center">
          <Loading />
        </Box>
      </LayoutWrapper>
    </>
  );
};

export default LoadingPage;
