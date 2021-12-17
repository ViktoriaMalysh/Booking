// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Form, Col } from "react-bootstrap";
// import { useSelector, useDispatch, connect } from "react-redux";
// import { FLAG, REQUESTED_SUCCEEDED_CLOSE_USER } from "../redux/types";
// import { useHistory } from "react-router-dom";
// import "../App.css";
// import { fetchChange, fetchChangePass } from "../redux/actionUsers";

// function ChangePassword() {
//   let history = useHistory();
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state);
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     dispatch(fetchChangePass(store.users.userId, password));

//     if (store.users.flag) {
//       history.push("/users/changeProfile");
//       dispatch({ type: FLAG, payload: false });
//     }

//     setTimeout(() => {
//       dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
//     }, 1000);
//   };

//   return (
//     <div className="auth1">
//       {/* {store.users.text && <Alert text={store.users.text} />} */}
//       <div className="aform11">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group
//             className="mb-3"
//             controlId="formGridPassword"
//             onChange={(e) => setPassword(e.target.value)}
//             as={Col}
//             md="8"
//           >
//             <Form.Label>
//               <h4>
//                 <i>Enter your password</i>
//               </h4>
//             </Form.Label>
//             <Form.Control type="password" placeholder="Password" required />
//           </Form.Group>

//           <Button variant="warning" type="submit">
//             Check password
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// const mapDispatchToProps = {
//   fetchChange,
// };

// function mapStateToProps(state) {
//   return { store: state };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
