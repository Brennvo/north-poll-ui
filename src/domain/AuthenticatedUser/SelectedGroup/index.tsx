import React, { useEffect, useState } from "react";
import { useGroup, useGroupDispatch } from "../GroupProvider/GroupProvider";
import { useParams } from "react-router-dom";

import myAxios from "src/config/axios";
import Loading from "src/components/Loading";
import SelectedPoll from "../SelectedPoll";
import useInnerWidth from "src/hooks/useInnerWidth";

const PollList: React.FC = () => {
  const { selectedGroup: group } = useGroup();
  const dispatch = useGroupDispatch();

  return (
    <ul>
      {group!.polls.map((poll) => (
        <li key={poll.id}>
          <button
            onClick={() => dispatch!({ type: "SELECT_POLL", payload: poll })}
          >
            {poll.user.username}
          </button>
        </li>
      ))}
    </ul>
  );
};

const SelectedGroup: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { selectedGroup: group } = useGroup();
  const dispatch = useGroupDispatch();
  const innerWidth = useInnerWidth();

  useEffect(() => {
    myAxios
      .get(`/group/${groupId}`)
      .then(({ data }) => {
        dispatch!({ type: "SELECT_GROUP", payload: data });
        setIsLoading(false);
      })
      .catch(() => {
        dispatch!({ type: "ERROR" });
      });
  }, [groupId, dispatch]);

  if (isLoading || !group) {
    return <Loading />;
  }

  if (innerWidth < 768) {
    return group.selectedPoll ? (
      <>
        <button onClick={() => dispatch!({ type: "DESELECT_POLL" })}>
          Back
        </button>
        <SelectedPoll />
      </>
    ) : (
      <PollList />
    );
  }

  return (
    <>
      <section>
        <h1>{group.name}</h1>
        <div style={{ display: "flex" }}>
          <div>
            <h2>Polls</h2>
            <PollList />
          </div>

          <div>{group.selectedPoll && <SelectedPoll />}</div>
        </div>
      </section>
    </>
  );
};

export default SelectedGroup;
