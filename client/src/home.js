import React from "react";
import { connect, useSelector } from "react-redux";

function Home() {
  const store = useSelector((state) => state);
  return (
    <div>
      {store.users.userRole === 1 ? (
        <div className="form121">
          <h1>WELCOME TO THE TEAMGEIST!</h1>
        </div>
      ) : (
        <div className="form121admin2">
          <div className="form121admin">
            <h1>WELCOME TO THE TEAMGEIST!</h1>
            <h3 style={{ fontStyle: "italic" }}>for admin</h3>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(Home);
