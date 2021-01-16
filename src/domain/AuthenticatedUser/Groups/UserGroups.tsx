import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Stack,
  Badge,
  IconButton,
  Heading,
  Text,
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import myAxios from "src/config/axios";
import { User } from "src/types/user.type";
import PageHeader from "src/components/PageHeader";
import { useGroup, useGroupDispatch } from "../GroupProvider/GroupProvider";
import { useHistory } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import LoadingCards from "src/components/LoadingCards";
import FlexGrid from "src/components/FlexGrid";
import FlexGridItem from "src/components/FlexGridItem";
import Card from "src/components/Card";
import { SettingsIcon, SmallAddIcon } from "@chakra-ui/icons";

type ExchangeCardProps = {
  name: string;
  groupId: number;
  newSuggestions: number;
  participants: User[];
  date: string;
};

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name,
  date,
  newSuggestions,
  participants,
  groupId,
}) => {
  return (
    <Card bg="white">
      <Stack display="flex" flexDirection="column" h="100%">
        <Stack
          isInline
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <Badge
            colorScheme={moment(date).isBefore(new Date()) ? "red" : "green"}
          >
            {moment(date).isBefore(new Date()) ? "Polls closed" : "Polls open"}
          </Badge>
          <Menu>
            <IconButton
              as={MenuButton}
              aria-label="Settings"
              colorScheme="blackIce"
              variant="outline"
              icon={<SettingsIcon />}
              size="xs"
            />
            <MenuList>
              <MenuItem>Leave Group</MenuItem>
              <MenuItem>Another Test</MenuItem>
            </MenuList>
          </Menu>
        </Stack>

        <Stack spacing={0} flexGrow={1}>
          <Heading as="h3" size="lg" mb={0}>
            {name}
          </Heading>
          <Text fontSize="sm" color="grey">
            {newSuggestions} new suggestions
          </Text>
        </Stack>

        <Stack isInline justifyContent="space-between" alignItems="center">
          <Button
            as={ReactRouterLink}
            // @ts-ignore
            to={`/group/${groupId}`}
            colorScheme="purpleIce"
          >
            Enter
          </Button>
          <AvatarGroup max={2}>
            {participants.map((participant) => (
              <Avatar
                key={participant.username}
                name={participant.username}
                src={participant.pictureUrl}
              />
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    </Card>
  );
};

const UserGroups: React.FC = () => {
  const history = useHistory();
  const { groups } = useGroup();
  const dispatch = useGroupDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    myAxios.get("/group").then(({ data }) => {
      dispatch!({ type: "INITIALIZE_GROUPS", payload: data });
      setIsLoading(false);
    });
  }, [dispatch]);

  return isLoading ? (
    <>
      <PageHeader
        title="My Gift Exchanges"
        hasAction={true}
        actionText="Create"
        actionClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          history.push("/create")
        }
      />
      <LoadingCards numCards={3} />
    </>
  ) : (
    <>
      {/* <PageHeader
        title="My Gift Exchanges"
        hasAction={true}
        actionText="Create"
        actionClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          history.push("/create")
        }
      /> */}
      <Heading>My Gift Exchanges</Heading>
      <Button
        mt="2rem"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          history.push("/create")
        }
        colorScheme="purpleIce"
        variant="solid"
        color="white"
        rightIcon={<SmallAddIcon />}
      >
        Create
      </Button>
      {groups && (
        <FlexGrid>
          {groups.map((group) => (
            <FlexGridItem key={group.id}>
              <ExchangeCard
                groupId={group.id}
                name={group.name}
                date={group.voteEndDt}
                newSuggestions={0}
                participants={group.polls.map((poll) => poll.user)}
              />
            </FlexGridItem>
          ))}
        </FlexGrid>
      )}
    </>
  );
};

export default UserGroups;
