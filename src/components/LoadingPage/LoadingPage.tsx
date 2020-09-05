import React from "react";
import LayoutWrapper from "../LayoutWrapper";
import { Box, Skeleton } from "@chakra-ui/core";
import Loading from "../Loading";

const LoadingPage: React.FC = () => {
  return (
    <>
      <Skeleton h="3.8em" colorStart="#3951ac" />
      <LayoutWrapper>
        <Box mt="25vh" as="section" d="flex" justifyContent="center">
          <Loading />
        </Box>
      </LayoutWrapper>
    </>
  );
};

export default LoadingPage;
