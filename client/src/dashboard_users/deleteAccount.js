import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { REQUESTED_SUCCEEDED_CLOSE_USER } from "../redux/types";
import { fetchDelete } from "../redux/actionUsers";
import { Alert } from "../Alert";

function DeleteAccount() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchDelete(token));
    if (store.users.success) {
      setTimeout(() => {
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
        history.push("/users/auth");
      }, 1400);
    }
  }, [store.users.success]);

  useEffect(() => {
    if (store.users.err) {
      setTimeout(() => {
        history.push("/");
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
      }, 1400);
    }
  }, [store.users.err]);

  return <div>{store.users.text && <Alert text={store.users.text} />}</div>;
}

const mapDispatchToProps = {
  fetchDelete,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
