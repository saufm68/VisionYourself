import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import Isihara from "../components/remote/Isihara.js";
import Snellen from "../components/remote/Snellen.js";
import Astigmatism from "../components/remote/Astigmatism.js";
import "./remote.css";

class Remote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "connect",
      socket: io(),
      phase: "instruction"
    };
    this.enterRoom = this.enterRoom.bind(this);
    this.changePhase = this.changePhase.bind(this);
    this.enterResult = this.enterResult.bind(this);
  }

  componentWillUnmount() {
    this.state.socket.emit("leave", this.state.socket.id);
  }

  enterRoom(event) {
    event.preventDefault();
    const room = event.target.childNodes[1].value;
    this.state.socket.emit("join", room);
    this.state.socket.emit("rgblind", "Rgblind");
    this.setState({ stage: "Rgblind" });
  }

  changePhase(phase) {
    this.state.socket.emit("change", phase);
    this.setState({ phase: phase });
  }

  enterResult(result, stage, event) {
    this.state.socket.emit(event, { stage: stage, result: result });
    this.setState({ stage: stage });
  }

  render() {
    if (this.state.stage === "connect") {
      var stage = (
        <div>
          <h1 className="header">Enter Password To Start</h1>
          <form className="text-center" onSubmit={this.enterRoom}>
            <input
              className="pass-input mt-5"
              type="text"
              placeholder="Password"
            />
            <br />
            <input
              className="mt-4 btn btn-lg pass-submit"
              type="submit"
              value="Enter"
            />
          </form>
        </div>
      );
    } else if (this.state.stage === "Rgblind") {
      var stage = (
        <Isihara
          enterResult={this.enterResult}
          changePhase={this.changePhase}
        />
      );
    } else if (this.state.stage === "acquity") {
      var stage = (
        <Snellen
          enterResult={this.enterResult}
          changePhase={this.changePhase}
        />
      );
    } else if (this.state.stage === "astigmatism") {
      var stage = (
        <Astigmatism
          enterResult={this.enterResult}
          changePhase={this.changePhase}
        />
      );
    } else if (this.state.stage === "end") {
      var stage = (
        <div className="text-center">
          <h1 className="header">Congratulations</h1>
          <p className="complete">You have completed the test</p>
          <p className="complete">
            Return to your computer to submit your test
          </p>
        </div>
      );
    }

    return <div className="page">{stage}</div>;
  }
}

export default withRouter(Remote);
