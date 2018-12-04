import React from "react";
import "./remote.css";

class Isihara extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "instruction",
      countdown: 5,
      answer: {}
    };
    this.startL = this.startL.bind(this);
    this.startR = this.startR.bind(this);
    this.next = this.next.bind(this);
    this.submit = this.submit.bind(this);
    this.enter = this.enter.bind(this);
    this.delete = this.delete.bind(this);
  }

  startL() {
    this.props.changePhase("isi-L1");
    this.setState({ phase: "isi-L1" });
  }

  startR() {
    this.props.changePhase("isi-R1");
    this.setState({ phase: "isi-R1" });
  }

  enter(event) {
    var input = document.getElementById("answer");
    var digit = event.target.innerHTML;
    input.value += digit;
  }

  submit() {
    var input = document.getElementById("answer");
    var copy = this.state.answer;
    copy[this.state.phase] = input.value;

    if (this.state.phase === "isi-L1") {
      var next = "isi-L2";
    } else if (this.state.phase === "isi-L2") {
      var next = "isi-L3";
    } else if (this.state.phase === "isi-L3") {
      var next = "instruction2";
    } else if (this.state.phase === "isi-R1") {
      var next = "isi-R2";
    } else if (this.state.phase === "isi-R2") {
      var next = "isi-R3";
    } else if (this.state.phase === "isi-R3") {
      var next = "cooldown";
      setTimeout(() => {
        document.getElementById("next").disabled = true;
      }, 10);
      const timer = setInterval(() => {
        const minus = this.state.countdown - 1;
        this.setState({ countdown: minus });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        document.getElementById("next").disabled = false;
      }, 5000);
    }

    this.props.changePhase(next);
    this.setState({ answer: copy, phase: next });

    input.value = "";
  }

  delete() {
    var input = document.getElementById("answer");
    input.value = "";
  }

  next() {
    this.props.changePhase("instruction");
    this.props.enterResult(this.state.answer, "astigmatism", "astigmatism");
  }

  render() {
    if (this.state.phase === "instruction") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Instructions</h1>
          <ol className="instructions mx-auto mt-5">
            <li>Sit at reading distance from your monitor</li>
            <li>Keep your glasses on</li>
            <li>Cover your right eye</li>
            <li>On this device, enter the numbers that you see</li>
            <li>
              Submit an empty answer if you cannot tell what the number is!
            </li>
          </ol>
          <button className="start-button my-4" onClick={this.startL}>
            Start
          </button>
        </div>
      );
    } else if (this.state.phase.includes("isi")) {
      var phase = (
        <div className="text-center">
          <h1 className="header mb-0">Enter What You See Below</h1>
          <input type="text" id="answer" defaultValue="" readOnly />
          <div className="buttonContainer">
            <div className="digit" onClick={this.enter}>
              1
            </div>
            <div className="digit" onClick={this.enter}>
              2
            </div>
            <div className="digit" onClick={this.enter}>
              3
            </div>
          </div>
          <div className="buttonContainer">
            <div className="digit" onClick={this.enter}>
              4
            </div>
            <div className="digit" onClick={this.enter}>
              5
            </div>
            <div className="digit" onClick={this.enter}>
              6
            </div>
          </div>
          <div className="buttonContainer">
            <div className="digit" onClick={this.enter}>
              7
            </div>
            <div className="digit" onClick={this.enter}>
              8
            </div>
            <div className="digit" onClick={this.enter}>
              9
            </div>
          </div>
          <div className="buttonContainer">
            <div className="enter btn-success" onClick={this.submit}>
              Enter
            </div>
            <div className="delete btn-danger" onClick={this.delete}>
              Delete
            </div>
          </div>
        </div>
      );
    } else if (this.state.phase === "instruction2") {
      var phase = (
        <div className="text-center">
          <h3 className="header">Instructions</h3>
          <ol className="instructions mx-auto mt-5">
            <li>Now cover your left eye</li>
            <li>On this device, enter the numbers that you see</li>
          </ol>
          <button className="start-button my-4" onClick={this.startR}>
            Start
          </button>
        </div>
      );
    } else if (this.state.phase === "cooldown") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Rest</h1>
          <h1 className="cooldown">{this.state.countdown}</h1>
          <br />
          <button
            className="start-button btn-lg mt-4"
            id="next"
            onClick={this.next}
          >
            Next
          </button>
        </div>
      );
    }
    return <div className="component-container">{phase}</div>;
  }
}

export default Isihara;
