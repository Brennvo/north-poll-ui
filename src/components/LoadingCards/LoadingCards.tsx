import React from "react";
import { Flex, Skeleton } from "@chakra-ui/core";

type LoadingCardProps = {
  numCards: number;
};

const LoadingCards: React.FC<LoadingCardProps> = ({ numCards }) => {
  return (
    <Flex
      direction="row"
      wrap="wrap"
      ml={["-.2rem", "-.2rem", "-1rem"]}
      mr={["-.2rem", "-.2rem", "-1rem"]}
    >
      {[...Array(numCards)].map(() => (
        <Skeleton
          h="14.375rem"
          flex="1 0 18.75rem"
          m={[".2rem", ".2rem", "1rem"]}
        />
      ))}
      {numCards % 2 !== 0 && (
        <Skeleton h="0" flex="1 0 18.75rem" m={[".2rem", ".2rem", "1rem"]} />
      )}
    </Flex>
  );
};

export default LoadingCards;
