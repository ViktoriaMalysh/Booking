import React from "react";
import { Button } from "react-bootstrap";

export default function BtnComponent(props) {

  return (
    <div>
      {props.status === 0 ? (<Button variant="success" onClick={props.start}>Start</Button>) : ("")}

      {props.status === 1 ? (
        <div>
          <Button variant="outline-success" onClick={props.stop}>Stop</Button>{" "}
          <Button variant="outline-danger" onClick={props.reset}>Reset</Button>{" "}
        </div>
      ) : ("")}

      {props.status === 2 ? (
        <div>
          <Button variant="outline-success" onClick={props.resume}>Resume</Button>{" "}
          <Button variant="outline-danger" onClick={props.reset}>Reset</Button>{" "}
        </div>
      ) : ("")}

        <div style={{paddingTop:'1em'}}><Button variant="outline-success" onClick={props.save}>Save project</Button>{" "}</div>
        <p style={{paddingTop:'2em', fontSize:'1.1em', fontStyle: 'italic' }}> If you want to suspend the operation of the counter press the "stop" button, in order to reset the counter press the "reset" button. <br/>
            if you have finished working on this project, stop the counter and click the "save project" button</p>
    </div>
  
  );
}
