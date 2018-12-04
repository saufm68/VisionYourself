import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import Isihara from "../components/screen/Isihara.js";
import Snellen from "../components/screen/Snellen.js";
import Astigmatism from "../components/screen/Astigmatism.js";
import End from "../components/screen/End.js";
import { Jumbotron, Button } from "reactstrap";
import "./test.css";

import Plate3 from "../components/screen/isiharaMedia/Plate3.png";
import Plate7 from "../components/screen/isiharaMedia/Plate7.png";
import Plate8 from "../components/screen/isiharaMedia/Plate8.png";
import Plate9 from "../components/screen/isiharaMedia/Plate9.png";
import Plate13 from "../components/screen/isiharaMedia/Plate13.png";
import Plate14A from "../components/screen/isiharaMedia/Plate14A.png";
import Plate15A from "../components/screen/isiharaMedia/Plate15A.png";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: "",
      stage: "intro",
      socket: io(),
      answers: [],
      questions: [],
      plateArray: [
        { name: "Plate3", img: Plate3 },
        { name: "Plate7", img: Plate7 },
        { name: "Plate8", img: Plate8 },
        { name: "Plate9", img: Plate9 },
        { name: "Plate13", img: Plate13 },
        { name: "Plate14A", img: Plate14A },
        { name: "Plate15A", img: Plate15A }
      ],
      phase: "instruction"
    };
    this.changeState = this.changeState.bind(this);
    this.submit = this.submit.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addDoctor = this.addDoctor.bind(this);
    this.doctorName = this.doctorName.bind(this);
    //Join a room
    this.state.socket.emit("join", this.state.socket.id);

    this.state.socket.on("rgblind", msg => {
      this.setState({ stage: msg });
    });

    this.state.socket.on("change", msg => {
      this.setState({ phase: msg });
    });

    this.state.socket.on("acquity", data => {
      const copy = this.state.answers;
      copy.push(data.result);
      this.setState({ stage: data.stage, answers: copy });
    });

    this.state.socket.on("astigmatism", data => {
      const copy = this.state.answers;
      copy.push(data.result);
      this.setState({ stage: data.stage, answers: copy });
    });

    this.state.socket.on("end", data => {
      const copy = this.state.answers;
      copy.push(data.result);
      this.setState({ stage: data.stage, answers: copy });
    });
  }

  changeState() {
    if (this.state.stage === "intro") {
      this.setState({ stage: "addDoctor" });
    }
  }

  doctorName(event) {
    this.setState({ doctor: event.target.value });
  }

  addDoctor() {
    if (this.state.stage === "addDoctor") {
      this.setState({ stage: "connect" });
    }
  }

  submit() {
    this.state.socket.emit("leave", this.state.socket.id);
  }

  addQuestion(question) {
    const copy = this.state.questions;
    copy.push(question);
    this.setState({ questions: copy });
  }

  render() {
    function randomPicker(array, phase) {
      if (phase.includes("isi")) {
        const randomNo = Math.floor(Math.random() * array.length);
        const copy = array;
        const removed = copy.splice(randomNo, 1);
        console.log(removed);
        return removed;
      }
    }

    function snellenPicker(phase) {
      if (phase.includes("snellen-L")) {
        return parseInt(phase.split("L")[1]) - 1;
      } else if (phase.includes("snellen-R")) {
        return parseInt(phase.split("R")[1]) - 1;
      }
    }

    if (this.state.stage === "intro") {
      var stage = (
        <div className="text-center">
          <h1 className="header">Welcome to VisionYourself!</h1>
          <Jumbotron className="intro">
            <h2 className="text-center">
              This service requires the use of 2 devices, preferably a
              laptop/desktop and a mobile phone
            </h2>
            <Button color="warning" className="mt-5" onClick={this.changeState}>
              <b>Click to start</b>
            </Button>
          </Jumbotron>
        </div>
      );
    } else if (this.state.stage === "addDoctor") {
      var stage = (
        <div className="text-center">
          <h1 className="header">VisionYourself</h1>
          <Jumbotron className="intro">
            <h2 className="text-center">
              Add the id of the doctor that recommended you
            </h2>
            <input
              className="mt-4 mx-auto d-block"
              type="text"
              value={this.state.doctor}
              onChange={this.doctorName}
            />
            <Button
              id="connect-btn"
              color="warning"
              className="mt-4"
              onClick={this.addDoctor}
            >
              <b>Submit</b>
            </Button>
          </Jumbotron>
        </div>
      );
    } else if (this.state.stage === "connect") {
      var stage = (
        <div className="text-center">
          <h1 className="header">VisionYourself</h1>
          <Jumbotron className="intro">
            <h2 className="text-center">
              On your other device, visit the link below: <br /> <br />
              Link: EyeCare/sync
              <br />
              <br />
              Password:
              {this.state.socket.id}
            </h2>
          </Jumbotron>
        </div>
      );
    } else if (this.state.stage === "Rgblind") {
      var stage = (
        <Isihara
          phase={this.state.phase}
          plate={randomPicker(this.state.plateArray, this.state.phase)}
          addQuestion={this.addQuestion}
        />
      );
    } else if (this.state.stage === "acquity") {
      var stage = (
        <Snellen
          phase={this.state.phase}
          count={snellenPicker(this.state.phase)}
          addQuestion={this.addQuestion}
        />
      );
    } else if (this.state.stage === "astigmatism") {
      var stage = (
        <Astigmatism phase={this.state.phase} addQuestion={this.addQuestion} />
      );
    } else if (this.state.stage === "end") {
      var stage = (
        <End
          answers={JSON.stringify(this.state.answers)}
          questions={JSON.stringify(this.state.questions)}
          doctor={this.state.doctor}
          leave={this.submit}
        />
      );
    }

    return <div className="page">{stage}</div>;
  }
}

export default withRouter(Test);
