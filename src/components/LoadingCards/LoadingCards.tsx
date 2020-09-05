import React from "react";
import { Skeleton } from "@chakra-ui/core";
import FlexGrid from "../FlexGrid";
import FlexGridItem from "../FlexGridItem";
import Card from "../Card";

type LoadingCardProps = {
  numCards: number;
};

const LoadingCards: React.FC<LoadingCardProps> = ({ numCards }) => {
  return (
    <FlexGrid>
      {[...Array(numCards)].map(() => (
        <FlexGridItem>
          <Skeleton>
            <Card />
          </Skeleton>
        </FlexGridItem>
      ))}
    </FlexGrid>
  );
};

export default LoadingCards;
