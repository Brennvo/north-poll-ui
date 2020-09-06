import myAxios from "src/config/axios";
import { useHistory } from "react-router";

const useAuthGuard = () => {
  const history = useHistory();

  myAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      switch (err.response.status) {
        case 404:
          history.push("/not-found");
          return Promise.reject(err);
        case 401:
          history.push("/");
          return Promise.reject(err);
        default:
          return Promise.reject(err);
      }
    }
  );
};

export default useAuthGuard;
