import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import Plate3 from "./screen/isiharaMedia/Plate3.png";
import Plate7 from "./screen/isiharaMedia/Plate7.png";
import Plate8 from "./screen/isiharaMedia/Plate8.png";
import Plate9 from "./screen/isiharaMedia/Plate9.png";
import Plate13 from "./screen/isiharaMedia/Plate13.png";
import Plate14A from "./screen/isiharaMedia/Plate14A.png";
import Plate15A from "./screen/isiharaMedia/Plate15A.png";
import AstigmatismChart from "./screen/astigmatismMedia/astigmatism.png";
import Snellen from "./screen/snellenMedia/20:63.png";

import "./user.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      modal: false,
      selected: null,
      selectedQ: null,
      selectedA: null,
      selectedAddon: null
    };

    this.toggle = this.toggle.bind(this);
    fetch("/api/getRecord")
      .then(res => res.json())
      .then(dashboard => {
        this.setState({ records: dashboard });
      });
  }

  toggle(event) {
    if (event.target.id) {
      var questions = JSON.parse(
        this.state.records[event.target.id]["question"]
      );
      var answers = JSON.parse(this.state.records[event.target.id]["answers"]);
      var addOn = JSON.parse(this.state.records[event.target.id]["addon"]);
      this.setState({
        modal: !this.state.modal,
        selected: this.state.records[event.target.id],
        selectedQ: questions,
        selectedA: answers,
        selectedAddon: addOn
      });
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  }

  render() {
    function isi(text) {
      if (text === "Plate3") {
        return Plate3;
      } else if (text === "Plate7") {
        return Plate7;
      } else if (text === "Plate8") {
        return Plate8;
      } else if (text === "Plate9") {
        return Plate9;
      } else if (text === "Plate13") {
        return Plate13;
      } else if (text === "Plate14A") {
        return Plate14A;
      } else if (text === "Plate15A") {
        return Plate15A;
      }
    }

    function snellen(text) {
      const rotate = text.split("translate(-50%, -50%) ");
      return rotate[1];
    }

    if (this.state.records) {
      var allAppt = this.state.records.map((element, index) => {
        return (
          <ListGroupItem
            className="record-list"
            key={element.id}
            id={index}
            onClick={this.toggle}
          >
            {element.name}
            <span id={index} className="float-right">
              {element.email}
            </span>
          </ListGroupItem>
        );
      });

      var dashboard = (
        <Jumbotron className="profile-jumbo">
          <h1 className="display-5 text-center">All Appointments</h1>
          <ListGroup className="mt-5" flush>
            {allAppt}
          </ListGroup>
        </Jumbotron>
      );
    } else {
      var dashboard = (
        <Jumbotron className="profile-jumbo">
          <h1 className="display-4 text-center">No Appointments</h1>
        </Jumbotron>
      );
    }

    if (this.state.selected) {
      var testResult = (
        <div className="container-fluid">
          <div className="row text-center mb-2">
            <div className="col">Red-Green Blindness</div>
          </div>
          <div className="row text-center mb-4">
            <div className="col"> Left Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-L1"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-L1"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              {" "}
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-L2"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-L2"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-L3"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-L3"]}
            </div>
          </div>
          <div className="row text-center">
            <div className="col my-4"> Right Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-R1"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-R1"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-R2"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-R2"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="85%"
                src={isi(this.state.selectedQ[0]["isi-R3"])}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[0]["isi-R3"]}
            </div>
          </div>
          <div className="row text-center mt-4 mb-2">
            <div className="col ">Astigmatism</div>
          </div>
          <div className="row text-center mb-2">
            <div className="col"> Left Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img width="100%" height="100%" src={AstigmatismChart} />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[1]["astigmatism-L1"]}
            </div>
          </div>
          <div className="row text-center">
            <div className="col my-4"> Right Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img width="100%" height="100%" src={AstigmatismChart} />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[1]["astigmatism-R1"]}
            </div>
          </div>
          <div className="row text-center mt-4 mb-2">
            <div className="col">Visual Aquity</div>
          </div>
          <div className="row text-center mb-2">
            <div className="col"> Left Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L1"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L1"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L2"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L2"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L3"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L3"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L4"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L4"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L5"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L5"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L6"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L6"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L7"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L7"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L8"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L8"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-L9"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-L9"]}
            </div>
          </div>
          <div className="row text-center">
            <div className="col my-4"> Right Eye</div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R1"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R1"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R2"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R2"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R3"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R3"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R4"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R4"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R5"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R5"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R6"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R6"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R7"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R7"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R8"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R8"]}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <img
                width="50%"
                height="80%"
                src={Snellen}
                style={{
                  transform: snellen(this.state.selectedQ[2]["snellen-R9"])
                }}
              />
            </div>
            <div className="col-6 text-center">
              {this.state.selectedA[2]["snellen-R9"]}
            </div>
          </div>
          <div className="row text-center mt-5 mb-3">
            <div className="col">Questionare</div>
          </div>
          <div className="row text-center">
            <div className="col">Do you have any health conditions?</div>
          </div>
          <div className="row text-center">
            <div className="col">
              {this.state.selectedAddon["healthCondition"]}
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              Are you taking any medication that affects your vision?
            </div>
          </div>
          <div className="row text-center">
            <div className="col">{this.state.selectedAddon["medication"]}</div>
          </div>
          <div className="row text-center">
            <div className="col">
              Have you ever had a serious eye condition or surgery?
            </div>
          </div>
          <div className="row text-center">
            <div className="col">{this.state.selectedAddon["surgery"]}</div>
          </div>
          <div className="row text-center">
            <div className="col">
              When was the last time you had your eyes checked by a
              professional?
            </div>
          </div>
          <div className="row text-center mb-4">
            <div className="col">{this.state.selectedAddon["checkup"]}</div>
          </div>
        </div>
      );

      var modalTitle = <span>{this.state.selected.name}</span>;
    } else {
      var testResult;
      var modalTitle;
    }

    return (
      <div className="homepage">
        {dashboard}
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
          <ModalBody>{testResult}</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Dashboard);
