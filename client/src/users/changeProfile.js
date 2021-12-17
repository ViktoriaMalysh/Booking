// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Form, Col, Row } from "react-bootstrap";
// import { useSelector, useDispatch, connect } from "react-redux";
// import { REQUESTED_SUCCEEDED_CLOSE_USER, USER_EMAIL, USER_NAME, USER_PASSWORD, USER_SURNAME } from "../redux/types";
// import { useHistory } from "react-router-dom";
// import "../App.css";
// import { fetchChange, fetchChangePass } from "../redux/actionUsers";

// function ChangeProfile() {
//   let history = useHistory();
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state);
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");




//   const handleSubmit = (event) => {
//     event.preventDefault();

//     dispatch(fetchChange(store.users.userId, name, surname, email, password));



//     if(store.users.change){
//       dispatch({ type: USER_NAME, payload: name });
//       dispatch({ type: USER_SURNAME, payload: surname });
//       dispatch({ type: USER_EMAIL, payload: email });
//     }

//     setTimeout(() => {
//       dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
//     }, 1000);

//     history.push("/users/myAccounts/myProfile");
  
//   };

//   return (
//     <div className="1auth">
//       {/* {store.users.text && <Alert text={store.users.text} />} */}
//       <div className="aform11">
//         <Form onSubmit={handleSubmit}>
//           <Row className="mb-3">
//             <Form.Group
//               className="mb-3"
//               as={Col}
//               md="8"
//               controlId="formGridAddress1"
//               onChange={(e) => setName(e.target.value)}
//             >
//               <Form.Label>
//                 <h4>
//                   <i>New name</i>
//                 </h4>
//               </Form.Label>
//               <Form.Control placeholder="Enter name" required />
//             </Form.Group>

//             <Form.Group
//               className="mb-3"
//               controlId="formGridAddress2"
//               as={Col}
//               md="8"
//               onChange={(e) => setSurname(e.target.value)}
//             >
//               <Form.Label>
//                 <h4>
//                   <i>New surname</i>
//                 </h4>
//               </Form.Label>
//               <Form.Control placeholder="Enter surname" required />
//             </Form.Group>

//             <Form.Group
//               className="mb-3"
//               controlId="formGridEmail"
//               as={Col}
//               md="8"
//               onChange={(e) => setEmail(e.target.value)}
//             >
//               <Form.Label>
//                 <h4>
//                   <i>New email</i>
//                 </h4>
//               </Form.Label>
//               <Form.Control type="email" placeholder="Enter email" required />
//             </Form.Group>

//             <Form.Group
//               className="mb-3"
//               controlId="formGridPassword"
//               onChange={(e) => setPassword(e.target.value)}
//               as={Col}
//               md="8"
//             >
//               <Form.Label>
//                 <h4>
//                   <i>Enter your password</i>
//                 </h4>
//               </Form.Label>
//               <Form.Control type="password" placeholder="Password" required />
//             </Form.Group>
//           </Row>

//           <Button variant="warning" type="submit">
//             Save change
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// const mapDispatchToProps = {
//   fetchChange,
//   // fetchDeleteTickets,
// };

// function mapStateToProps(state) {
//   return { store: state };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);
