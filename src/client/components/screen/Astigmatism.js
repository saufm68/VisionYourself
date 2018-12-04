import React from "react";
import { Jumbotron } from "reactstrap";
import "./screen.css";
import AstigmatismChart from "./astigmatismMedia/astigmatism.png";

class Astigmatism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {}
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  componentWillUnmount() {
    this.props.addQuestion(this.state.question);
  }

  addQuestion() {
    const copy = this.state.question;
    copy[this.props.phase] = "AstigmatismChart";
    this.setState({ question: copy });
  }

  render() {
    if (this.props.phase === "instruction") {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center">Astigmatism</h1>
        </Jumbotron>
      );
    } else if (this.props.phase.includes("astigmatism")) {
      var phase = (
        <div className="test text-center">
          <h1 className="title text-center">Astigmatism</h1>
          <img
            className="image"
            src={AstigmatismChart}
            onLoad={this.addQuestion}
          />
        </div>
      );
    } else {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center mt-5">Waiting...</h1>
        </Jumbotron>
      );
    }
    return <div className="test-display">{phase}</div>;
  }
}

export default Astigmatism;
