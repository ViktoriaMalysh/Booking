import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";

function MyProfile() {
  const [role, setRole] = useState("");
  let history = useHistory();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    if (store.users.userRole === 1) {
      setRole("user");
    } else if (store.users.userRole === 2) {
      setRole("admin");
    }
  }, []);


  if (loading) {
    return (
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  const changeProfile = (id) => {
    history.push("/users/checkPass");
  };

  return (
    <div className="firstform">
      <div className="form11">
        <p>Name: {store.users.userName}</p>

        <p>Surname: {store.users.userSurname}</p>

        <p>Email: {store.users.userEmail}</p>

        <p>Role: {role}</p>

        <Button
          variant="danger"
          onClick={() => changeProfile(store.users.userId)}
        >
          Change your profile
        </Button>
    </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(MyProfile);
