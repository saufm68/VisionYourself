import React from "react";
import { Jumbotron } from "reactstrap";

class End extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.leave();
  }

  render() {
    return (
      <div className="page">
        <h1 className="header">Medical Questions</h1>
        <Jumbotron className="end">
          <form className="form-submit" method="POST" action="/api/addRecord">
            <h4>Do you have any health conditions?</h4>
            <div className="radio-container">
              <input
                id="healthCondition-Y"
                name="healthCondition"
                type="radio"
                value="Yes"
              />
              <span className="mx-2">YES</span>
              <input
                id="healthCondition-N"
                name="healthCondition"
                type="radio"
                value="No"
                defaultChecked
              />
              <span className="mx-2">NO</span>
            </div>
            <h4>Are you taking any medication that affects your vision?</h4>
            <div className="radio-container">
              <input
                id="medication-Y"
                name="medication"
                type="radio"
                value="Yes"
              />
              <span className="mx-2">YES</span>
              <input
                id="medication-N"
                name="medication"
                type="radio"
                value="No"
                defaultChecked
              />
              <span className="mx-2">NO</span>
            </div>
            <h4>
              Have you ever had a serious eye condition or surgery? (eg:
              glaucoma, lasic eye surgery)
            </h4>
            <div className="radio-container">
              <input id="surgery-Y" name="surgery" type="radio" value="Yes" />{" "}
              <span className="mx-2">YES</span>
              <input
                id="surgery-N"
                name="surgery"
                type="radio"
                value="No"
                defaultChecked
              />
              <span className="mx-2">NO</span>
            </div>
            <h4>
              When was the last time you had your eyes checked by a
              professional?
            </h4>
            <input
              id="checkup"
              type="text"
              name="checkup"
              required
              autoComplete="off"
            />
            <h4>Any other information you want to add?</h4>
            <textarea id="addon" name="additional" />
            <h4>Name</h4>
            <input type="text" name="name" />
            <h4>Email Address</h4>
            <input type="email" name="email" />
            <input type="hidden" name="doctor" value={this.props.doctor} />
            <input type="hidden" name="answers" value={this.props.answers} />
            <input
              type="hidden"
              name="questions"
              value={this.props.questions}
            />
            <input type="submit" value="Submit" />
          </form>
        </Jumbotron>
      </div>
    );
  }
}

export default End;
