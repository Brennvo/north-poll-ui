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
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";

import myAxios from "src/config/axios";
import { User } from "src/types/user.type";
import PageHeader from "src/components/PageHeader";
import { useGroup, useGroupDispatch } from "../GroupProvider/GroupProvider";
import { useHistory } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import LoadingCards from "src/components/LoadingCards";

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
    <Stack
      bg="white"
      width="100%"
      //width="18.75rem"
      //height="100%"
      h="14.375rem"
      p="1rem"
      borderRadius={5}
      boxShadow="0 0 4px grey"
      display="flex"
      flexDirection="column"
      m={0}
    >
      <Stack
        isInline
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <Badge
          variantColor={moment(date).isBefore(new Date()) ? "red" : "green"}
        >
          {moment(date).isBefore(new Date()) ? "Polls closed" : "Polls open"}
        </Badge>
        <Menu>
          <IconButton
            as={MenuButton}
            aria-label="Settings"
            variantColor="blackIce"
            variant="outline"
            icon="settings"
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
          variantColor="purpleIce"
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
      <PageHeader
        title="My Gift Exchanges"
        hasAction={true}
        actionText="Create"
        actionClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          history.push("/create")
        }
      />
      {groups && (
        <List
          d="flex"
          flexWrap="wrap"
          ml={["-.2rem", "-.2rem", "-1rem"]}
          mr={["-.2rem", "-.2rem", "-1rem"]}
        >
          {groups.map((group) => (
            <ListItem
              flex="1 0 18.75rem"
              m={[".2rem", ".2rem", "1rem"]}
              key={group.id}
            >
              <ExchangeCard
                groupId={group.id}
                name={group.name}
                date={group.voteEndDt}
                newSuggestions={0}
                participants={group.polls.map((poll) => poll.user)}
              />
            </ListItem>
          ))}
          {groups.length % 2 !== 0 && (
            <ListItem
              aria-hidden={true}
              flex="1 0 18.75rem"
              m={[".2rem", ".2rem", "1rem"]}
            />
          )}
        </List>
      )}
    </>
  );
};

export default UserGroups;
