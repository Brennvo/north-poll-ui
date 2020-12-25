import React from "react";
import { Skeleton } from "@chakra-ui/core";
import FlexGrid from "../FlexGrid";
import FlexGridItem from "../FlexGridItem";
import Card from "../Card";

type LoadingCardProps = {
  /** The number of cards to render as loading */
  numCards: number;
};

/**
 * Used across the application as an alternative to a
 * loading spinner when a Card or group of Cards require
 * content that is being fetched asynchronously.
 * @see Card
 */
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
