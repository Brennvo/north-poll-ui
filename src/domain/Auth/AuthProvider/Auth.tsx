import React, { useReducer, useEffect, useContext } from "react";
import Loading from "src/components/Loading";
import { User } from "src/types/user.type";
import myAxios from "src/config/axios";
import useAuthGuard from "src/hooks/useAuthGuard";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: User;
};

type AuthContext = {
  user?: User;
  isAuthenticated: boolean;
  login: Function;
  logout: Function;
};

type Action = { type: "INVALIDATE_USER" } | { type: "SET_USER"; payload: User };

const AuthStateContext = React.createContext<AuthContext | undefined>(
  undefined
);
const AuthDispatchContext = React.createContext<Function | undefined>(
  undefined
);

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "INVALIDATE_USER":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    case "SET_USER":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
};

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useAuthGuard();

  useEffect(() => {
    myAxios
      .get("/user")
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: {
            id: data.id,
            username: data.username,
            pictureUrl: data.pictureUrl,
          },
        });
      })
      .catch(() => dispatch({ type: "INVALIDATE_USER" }));
  }, []);

  const logout = () =>
    myAxios.get("/auth/logout").then(() => {
      dispatch({ type: "INVALIDATE_USER" });
    });

  const login = (provider: string) =>
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/auth/${provider}`
    );

  return state.isLoading ? (
    <Loading />
  ) : (
    <AuthStateContext.Provider
      value={{
        login,
        logout,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuth = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { AuthProvider, useAuth, useAuthDispatch };
