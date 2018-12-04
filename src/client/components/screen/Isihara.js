import React from "react";
import { Jumbotron } from "reactstrap";
import "./screen.css";

class Isihara extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {}
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    if (this.props.phase.includes("isi")) {
      const copy = this.state.question;
      copy[this.props.phase] = this.props.plate[0].name;
      this.setState = { question: copy };
    }
  }

  componentWillUnmount() {
    this.props.addQuestion(this.state.question);
  }

  render() {
    if (this.props.phase === "instruction") {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center">Red-Green Blindness</h1>
        </Jumbotron>
      );
    } else if (this.props.phase.includes("isi") === false) {
      var phase = (
        <Jumbotron className="jumbo">
          <h1 className="start text-center mt-5">Waiting...</h1>
        </Jumbotron>
      );
    } else {
      var phase = (
        <div className="test text-center">
          <h1 className="title text-center">Red-Green Blindness</h1>
          <img
            className="image"
            src={this.props.plate[0].img}
            onLoad={this.addQuestion}
          />
        </div>
      );
    }
    return <div className="test-display">{phase}</div>;
  }
}

export default Isihara;
