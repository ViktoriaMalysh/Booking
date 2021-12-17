// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Spinner, Form, Card, Col, Row } from "react-bootstrap";
// import { useSelector, useDispatch, connect } from "react-redux";
// import { REQUESTED_SUCCEEDED_CLOSE_TICKET } from "../redux/types";
// import { useHistory } from "react-router-dom";

// // import { Alert } from "../components/Alert";
// import "../App.css";
// import MyAccounts from "./myAccounts";

// function MyTickets() {
//   const [deleteT, setDelete] = useState(false);
//   const [role, setRole] = useState("");

//   let history = useHistory();
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state);
//   const loading = useSelector((state) => state.app.loading);

//   useEffect(() => {
//     if (store.users.userRole === 1) {
//       setRole("user");
//     } else if (store.users.userRole === 2) {
//       setRole("admin");
//     }
//   }, []);


//   if (loading) {
//     return (
//       <div className="form1111">
//         <Spinner animation="border" variant="danger" role="status"></Spinner>
//       </div>
//     );
//   }

//   if (store.tickets.find) {
//     return (
//       <div>
//         <MyAccounts />
//         <div className="form1111">
//           <p>You haven`t any tickets</p>
//         </div>
//       </div>
//     );
//   }

//   const changeProfile = (id) => {
//     history.push("/users/checkPass");
//   };

//   return (
//     <div >
//       <MyAccounts />
//       <div className="first">
//       <div className="one">
//         <br/>
//         <br/>
//         <br/>
//         <p>Name: {store.users.userName}</p>

//         <p>Surname: {store.users.userSurname}</p>

//         <p>Email: {store.users.userEmail}</p>

//         <p>Role: {role}</p>

//         <Button
//           variant="danger"
//           onClick={() => changeProfile(store.users.userId)}
//         >
//           Change your profile
//         </Button>
//       </div>
//     </div>
//     </div>
//   );
// }

// const mapDispatchToProps = {

// };

// function mapStateToProps(state) {
//   return { store: state };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MyTickets);
