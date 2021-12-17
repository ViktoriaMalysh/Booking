import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_USER } from "../redux/types";
import { alert } from "../redux/actionProjects";
import { Alert } from "../Alert";

export default function Logout() {
  const dispatch = useDispatch();
  let history = useHistory();
  const store = useSelector((state) => state);

  useEffect(() => {
    LogoutFunk();
  }, []);

  function LogoutFunk() {
    localStorage.clear("token");
    dispatch({ type: CLEAR_USER });
    dispatch(alert("Logout success!"));
    setTimeout(() => {
      history.push("/users/login");
    }, 1400);
  }
  return (
    <div>{store.projects.text && <Alert text={store.projects.text} />}</div>
  );
}
