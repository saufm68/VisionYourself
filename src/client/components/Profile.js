import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "reactstrap";

import "./user.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };

    fetch("/api/profile")
      .then(res => res.json())
      .then(profile => {
        this.setState({ profile: profile });
      });
  }

  render() {
    if (this.state.profile) {
      var profile = (
        <Jumbotron className="profile-jumbo">
          <h1 className="display-4 doctor-name">{this.state.profile.name}</h1>
          <div>ID: {this.state.profile.id}</div>
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-7 p-0 clinic">
                <h3>Clinic:</h3>
                <h4>{this.state.profile.clinic}</h4>
                <h6>Address: </h6>
                <h6>{this.state.profile.address}</h6>
                <h6>Postal Code:</h6>
                <h6> {this.state.profile.postalcode}</h6>
              </div>
              <div className="col-5 p-0 contact">
                <h3>Contacts:</h3>
                <h6>Email:</h6>
                <h6> {this.state.profile.email}</h6>
                <h6>Office HP:</h6>
                <h6>{this.state.profile.contact}</h6>
                <form
                  className="mt-3"
                  method="post"
                  action="/api/deleteProfile"
                >
                  <input
                    type="submit"
                    className="btn-danger"
                    value="Delete Account"
                  />
                </form>
              </div>
            </div>
          </div>
        </Jumbotron>
      );
    } else {
      var profile;
    }
    return <div className="homepage">{profile}</div>;
  }
}

export default withRouter(Profile);
