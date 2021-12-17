import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import { fetchTime } from "./redux/actionProjects";
import "./App.css";
import "./teamgeist.css";
import { NAME_PROJECT, REQUESTED_SUCCEEDED_CLOSE_PROJECT } from "./redux/types";
import { useHistory } from "react-router";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [startTime1, setStartTime] = useState(new Date(2019, 0o0, 15, 18, 43, 59).toLocaleTimeString().slice(0, -3));
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
    let startTime = new Date();
    setStartTime(startTime);
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
    let end = new Date();
    const project = {
      projectName: store.projects.nameProject,
      id: store.users.userId,
      start: startTime1,
      end: end,
    };
    dispatch(fetchTime(project));
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT })
    }, 1000)
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const save = () => {
    // stop();
    setTimeout(() => {
      history.push("/projects/showProjects");
      dispatch({ type: NAME_PROJECT, payload: "" });
    }, 1000)
  };

  const resume = () => start();

  return (
    <div className="form1">
      <div className="stopwatch">
        <DisplayComponent time={time} />
        <BtnComponent
          status={status}
          resume={resume}
          reset={reset}
          stop={stop}
          start={start}
          save={save}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchTime,
};

const mapStateToProps = (state) => {
  return { store: state };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);


