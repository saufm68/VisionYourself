import React from "react";

class Astigmatism extends React.Component {
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
    this.answer = this.answer.bind(this);
  }

  startL() {
    this.props.changePhase("astigmatism-L1");
    this.setState({ phase: "astigmatism-L1" });
  }
  startR() {
    this.props.changePhase("astigmatism-R1");
    this.setState({ phase: "astigmatism-R1" });
  }

  answer(event) {
    const answer = event.target.innerHTML;
    const copy = this.state.answer;
    copy[this.state.phase] = answer;

    if (this.state.phase === "astigmatism-L1") {
      var next = "instruction2";
    } else if (this.state.phase === "astigmatism-R1") {
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
    this.props.enterResult(this.state.answer, "acquity", "acquity");
  }

  render() {
    if (this.state.phase === "instruction") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Instructions</h1>
          <ol className="instructions mx-auto mt-5">
            <li>Stay 1 meter away from the monitor</li>
            <li>Keep your glasses on</li>
            <li>
              Without pressing on the eyelid, cover your right eye with your
              hand.
            </li>
            <li>Indicate the lines that look darker, if there is any.</li>
          </ol>
          <button className="start-button my-4" onClick={this.startL}>
            Start
          </button>
        </div>
      );
    } else if (this.state.phase.includes("astigmatism")) {
      var phase = (
        <div className="text-center">
          <h1 className="header">
            Indicate if you see can see lines that are darker/sharper than the
            rest
          </h1>
          <div className="astigmatism">
            <div className="question btn-success" onClick={this.answer}>
              YES
            </div>
            <div className="question btn-danger" onClick={this.answer}>
              NO
            </div>
          </div>
        </div>
      );
    } else if (this.state.phase === "instruction2") {
      var phase = (
        <div className="text-center">
          <h1 className="header">Instructions</h1>
          <ol className="instructions mx-auto mt-5">
            <li>
              Without pressing on the eyelid, now cover your left eye with your
              hand.
            </li>
            <li>Indicate the lines that look darker, if there is any.</li>
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

export default Astigmatism;
