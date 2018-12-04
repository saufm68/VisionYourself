import React from "react";

class Snellen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "instruction",
      countdown: 5,
      answer: {}
    };
    this.startL = this.startL.bind(this);
    this.startR = this.startR.bind(this);
    this.enter = this.enter.bind(this);
    this.next = this.next.bind(this);
  }

  startL() {
    this.props.changePhase("snellen-L1");
    this.setState({ phase: "snellen-L1" });
  }

  startR() {
    this.props.changePhase("snellen-R1");
    this.setState({ phase: "snellen-R1" });
  }

  enter(event) {
    const answer = event.target.innerHTML;
    const copy = this.state.answer;
    copy[this.state.phase] = answer;

    if (
      this.state.phase.includes("snellen-L") &&
      this.state.phase !== "snellen-L9"
    ) {
      var array = this.state.phase.split("L");
      array[1] = parseInt(array[1]) + 1;
      var next = array.join("L");
    } else if (
      this.state.phase.includes("snellen-R") &&
      this.state.phase !== "snellen-R9"
    ) {
      var array = this.state.phase.split("R");
      array[1] = parseInt(array[1]) + 1;
      var next = array.join("R");
    } else if (this.state.phase === "snellen-L9") {
      var next = "instruction2";
    } else if (this.state.phase === "snellen-R9") {
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
  }

  next() {
    this.props.changePhase("instruction");
    this.props.enterResult(this.state.answer, "end", "end");
  }

  render() {
    if (this.state.phase === "instruction") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Instructions</h1>
          <ol className="instructions mx-auto mt-5">
            <li>Stand 10 feet away from your monitor</li>
            <li>Keep your glasses on</li>
            <li>
              Cover your right eye (Do not apply pressure to the covered eye, as
              it might affect that eye’s vision when you test it.)
            </li>
            <li>
              On this device, enter the direction the letter 'E' is facing
            </li>
            <li>It is ok if you cannot tell the direction... Do not guess</li>
          </ol>
          <button className="start-button my-4" onClick={this.startL}>
            Start
          </button>
        </div>
      );
    } else if (this.state.phase.includes("snellen")) {
      var phase = (
        <div className="text-center">
          <h1 className="header">
            Enter the direction the letter 'E' is facing
          </h1>
          <div className="top">
            <div className="snellen-button" onClick={this.enter}>
              Up
            </div>
          </div>
          <div className="mid">
            <div className="snellen-button" onClick={this.enter}>
              Left
            </div>
            <div className="snellen-button" onClick={this.enter}>
              Right
            </div>
          </div>
          <div className="bot">
            <div className="snellen-button" onClick={this.enter}>
              Down
            </div>
          </div>
          <div>
            <button className="start-button btn-lg my-5" onClick={this.enter}>
              Cannot Tell
            </button>
          </div>
        </div>
      );
    } else if (this.state.phase === "instruction2") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Instructions</h1>
          <ol className="instructions mx-auto mt-5">
            <li>
              Now cover your left eye (Do not apply pressure to the covered eye,
              as it might affect that eye’s vision when you test it.)
            </li>
            <li>
              On this device, enter the direction the letter 'E' is facing
            </li>
            <li>It is ok if you cannot tell the direction... Do not guess</li>
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

    return <div>{phase}</div>;
  }
}

export default Snellen;
