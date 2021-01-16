import React, { useEffect, useState } from "react";
import { useGroup, useGroupDispatch } from "../GroupProvider/GroupProvider";
import Loading from "src/components/Loading";
import { useParams } from "react-router";
import myAxios from "src/config/axios";
import { Link } from "react-router-dom";

const Poll: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedGroup: group } = useGroup();
  const dispatch = useGroupDispatch();
  const { groupId, pollId } = useParams<{ groupId: string; pollId: string }>();

  useEffect(() => {
    setIsLoading(true);
    myAxios
      .get(`/poll/${pollId}`)
      .then(({ data }) => {
        dispatch!({ type: "SELECT_POLL", payload: data });
      })
      .catch(() => {
        dispatch!({ type: "ERROR" });
      });
    setIsLoading(false);
  }, [pollId]);

  return isLoading || !group?.selectedPoll ? (
    <Loading />
  ) : (
    <>
      <Link to={`/group/${groupId}`}>Previous Group</Link>
      <h1>{group.selectedPoll.user.username}'s Poll</h1>
      <h2>Suggestions</h2>
      <ul>
        {group.selectedPoll.suggestions.map((suggestion) => (
          <h3>{suggestion.title}</h3>
        ))}
      </ul>
    </>
  );
};

export default Poll;
