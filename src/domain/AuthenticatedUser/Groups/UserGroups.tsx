import React, { useEffect, useState } from "react";
import myAxios from "src/config/axios";
import { Link } from "react-router-dom";
import { useGroup, useGroupDispatch } from "../GroupProvider/GroupProvider";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";

const UserGroups: React.FC = () => {
  const { groups } = useGroup();
  const dispatch = useGroupDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    myAxios.get("/group").then(({ data }) => {
      dispatch!({ type: "INITIALIZE_GROUPS", payload: data });
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <PageHeader
        title="My Gift Exchanges"
        hasAction={true}
        actionText="Create"
        actionClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          console.log("clicked")
        }
      />
      {groups && (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <Link to={`/group/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserGroups;
