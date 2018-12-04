import React from "react";
import { Jumbotron } from "reactstrap";
import "./screen.css";
import first from "./snellenMedia/20:200.png";
import second from "./snellenMedia/20:100.png";
import third from "./snellenMedia/20:80.png";
import fourth from "./snellenMedia/20:63.png";
import fifth from "./snellenMedia/20:50.png";
import sixth from "./snellenMedia/20:40.png";
import seventh from "./snellenMedia/20:32.png";
import eigth from "./snellenMedia/20:25.png";
import nineth from "./snellenMedia/20:20.png";

class Snellen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: ["90deg", "180deg", "270deg", "360deg"],
      question: {}
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  componentWillUnmount() {
    this.props.addQuestion(this.state.question);
  }

  addQuestion(event) {
    const copy = this.state.question;
    copy[this.props.phase] = event.target.style.transform;
    console.log(event.target.style.transform);
    this.setState({ question: copy });
  }

  render() {
    const array = [
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eigth,
      nineth
    ];

    let transform = `translate(-50%, -50%) rotate(${
      this.state.rotation[
        Math.floor(Math.random() * this.state.rotation.length)
      ]
    })`;

    if (this.props.phase === "instruction") {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center">Visual Aquity</h1>
        </Jumbotron>
      );
    } else if (this.props.phase.includes("snellen") === false) {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center mt-5">Waiting...</h1>
        </Jumbotron>
      );
    } else {
      var phase = (
        <div className="test text-center">
          <h1 className="title text-center">Astigmatism</h1>
          <img
            className="snellen-image"
            id="snellen-img"
            src={array[this.props.count]}
            style={{ transform: transform }}
            onLoad={this.addQuestion}
          />
        </div>
      );
    }
    return <div className="test-display">{phase}</div>;
  }
}

export default Snellen;
