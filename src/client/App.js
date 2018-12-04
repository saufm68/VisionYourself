import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";

import Profile from "./components/Profile.js";
import Dashboard from "./components/Dashboard.js";
import Remote from "./pages/Remote.js";
import Test from "./pages/Test.js";
import "./app.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      user: null,
      isOpen: false,
      login: false,
      register: false,
      invalid: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    if (document.cookie.includes("doctor=")) {
      let cookieArray = document.cookie.split(";");
      let doctorString = cookieArray.filter(element =>
        element.includes("doctor=")
      );
      let doctor = doctorString[0].split("=")[1];
      this.setState({
        loggedin: true,
        user: doctor
      });
    }
  }

  toggleNav() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleLogin() {
    this.setState({ login: !this.state.login });
  }

  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  checkLogin(event) {
    event.preventDefault();
    const email = document.getElementById("exampleEmail").value;
    const password = document.getElementById("examplePassword").value;

    fetch("/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.invalid) {
          this.setState({ invalid: true });
        } else {
          location.reload();
        }
      });
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggleLogin}>
        &times;
      </button>
    );

    const closeBtnTwo = (
      <button className="close" onClick={this.toggleRegister}>
        &times;
      </button>
    );

    if (this.state.invalid) {
      var invalid = (
        <p className="text-center invalid">Password/Email is incorrect</p>
      );
    } else {
      var invalid;
    }

    if (this.state.loggedin) {
      var options = (
        <Nav className="ml-auto" navbar>
          <NavItem className="mt-2">
            <Link className="mr-2" to="/dashboard">
              DashBoard
            </Link>
          </NavItem>
          <NavItem className="mt-2">
            <Link to="/profile">{this.state.user}</Link>
          </NavItem>
          <NavItem>
            <form method="post" action="/logout">
              <input
                className="logout mt-2 pt-0"
                type="submit"
                value="logout"
              />
            </form>
          </NavItem>
        </Nav>
      );
    } else {
      var options = (
        <Nav className="ml-auto text-center" navbar>
          <NavItem onClick={this.toggleLogin} className="mr-3 clicker">
            Login
            <Modal
              isOpen={this.state.login}
              toggle={this.toggleLogin}
              className={this.props.className}
            >
              <ModalHeader
                className="no-border"
                toggle={this.toggleLogin}
                close={closeBtn}
              />
              {invalid}
              <Form
                className="form-modal"
                id="login"
                onSubmit={this.checkLogin}
              >
                <FormGroup>
                  <Label for="exampleEmail" className="mr-sm-2">
                    Email
                  </Label>
                  <Input type="email" name="email" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword" className="mr-sm-2">
                    Password
                  </Label>
                  <Input type="password" name="password" id="examplePassword" />
                </FormGroup>
                <Button className="mt-4" block>
                  Log In
                </Button>
              </Form>
            </Modal>
          </NavItem>
          <NavItem onClick={this.toggleRegister} className="mr-1 clicker">
            Register Clinic
            <Modal
              isOpen={this.state.register}
              toggle={this.toggleRegister}
              className={this.props.className}
            >
              <ModalHeader
                className="no-border"
                toggle={this.toggleRegister}
                close={closeBtnTwo}
              />
              <Form
                className="form-modal"
                id="register"
                method="POST"
                action="/register"
              >
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="displayName">Doctor's Name</Label>
                      <Input type="text" name="displayName" id="displayName" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="clinicName">Clinic's Name</Label>
                      <Input type="text" name="clinicName" id="clinicName" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="exampleAddress">Address</Label>
                  <Input type="text" name="address" id="exampleAddress" />
                </FormGroup>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="postalCode">Postal Code</Label>
                      <Input type="text" name="postalCode" id="postalCode" />
                    </FormGroup>
                  </Col>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="contact">Clinic Number</Label>
                      <Input type="number" name="contact" id="contact" />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="mt-1" block>
                  Register
                </Button>
              </Form>
            </Modal>
          </NavItem>
        </Nav>
      );
    }

    if (
      !window.location.href.includes("sync") &&
      !window.location.href.includes("test")
    ) {
      var nav = (
        <Navbar className="nav-bar" color="light" light expand="md">
          <NavbarBrand href="/">
            <h2 className="brand">VisionYourself</h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {options}
          </Collapse>
        </Navbar>
      );
    } else {
      var nav;
    }

    return (
      <div className="overall">
        {nav}
        <Switch>
          <Route path="/sync" component={Remote} />
          <Route path="/test" component={Test} />
          <Route
            path="/dashboard"
            render={props => <Dashboard user={this.props.user} />}
          />
          <Route
            path="/profile"
            render={props => <Profile user={this.props.user} />}
          />
          <Route path="/" render={props => <div className="homepage" />} />
        </Switch>
      </div>
    );
  }
}
