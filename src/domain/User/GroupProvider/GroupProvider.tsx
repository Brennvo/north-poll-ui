import React, { useReducer, useContext } from "react";
import { User } from "src/types/user.type";
import NotFound from "src/domain/Auth/NotFound";

type Invitation = {
  email: string;
};

type Vote = {
  id: number;
  user: User;
};

type Suggestion = {
  id: number;
  title: string;
  price: number;
  description: string;
  link?: string;
  votes?: Vote[];
};

type Poll = {
  id: number;
  user: User;
  suggestions: Suggestion[];
};

type Group = {
  id: number;
  name: string;
  voteEndDt: string;
  minPrice?: number;
  maxPrice?: number;
  owner: User;
  invitations: Invitation[];
  polls: Poll[];
  selectedPoll: Poll | null;
  isVotingOpen: boolean;
};

type AppState = {
  groups: Group[];
  selectedGroup: Group;
  isNotFound: boolean;
} & Group;

type GroupActions =
  | { type: "INITIALIZE_GROUPS"; payload: Group[] }
  | { type: "SELECT_GROUP"; payload: Group; isVotingOpen: false }
  | { type: "SELECT_POLL"; payload: Poll }
  | { type: "DESELECT_POLL" }
  | { type: "ERROR" };

const GroupStateContext = React.createContext<Partial<AppState>>({});
const GroupDispatchContext = React.createContext<Function | undefined>(
  undefined
);

function reducer(
  state: Partial<AppState>,
  action: GroupActions
): Partial<AppState> {
  switch (action.type) {
    case "INITIALIZE_GROUPS":
      return {
        ...state,
        groups: action.payload,
      };
    case "SELECT_GROUP":
      return {
        ...state,
        selectedGroup: action.payload,
        isVotingOpen: action.isVotingOpen,
        selectedPoll: null,
      };
    case "SELECT_POLL":
      return {
        ...(state as AppState),
        selectedGroup: {
          ...(state.selectedGroup as Group),
          selectedPoll: action.payload,
        },
      };
    case "DESELECT_POLL":
      return {
        ...(state as AppState),
        selectedGroup: {
          ...(state.selectedGroup as Group),
          selectedPoll: null,
        },
      };
    case "ERROR":
      return {
        isNotFound: true,
      };
    default:
      return { ...(state as Group) };
  }
}

const GroupProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  if (state.isNotFound) {
    return <NotFound />;
  }

  return (
    <GroupStateContext.Provider value={state}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupStateContext.Provider>
  );
};

const useGroup = () => useContext(GroupStateContext);
const useGroupDispatch = () => useContext(GroupDispatchContext);

export { GroupProvider, useGroup, useGroupDispatch };
